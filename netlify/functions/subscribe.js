exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        // Fallback to URLSearchParams if submitted as urlencoded form
        const params = new URLSearchParams(event.body);
        body = Object.fromEntries(params);
      }
    }

    const { email, FIRSTNAME, firstName, website } = body;

    // Honeypot check: silently return success if bot filled the fake input
    if (website && website.trim() !== "") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, message: "Subscription received" })
      };
    }

    const userEmail = (email || "").trim().toLowerCase();
    const userFirstName = (firstName || FIRSTNAME || "").trim();

    if (!userEmail || !userEmail.includes("@")) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "A valid email address is required." })
      };
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY environment variable is not set.");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Server configuration error. Please check environment variables." })
      };
    }

    // List ID 7: "The Everyday Superfood"
    const LIST_ID = 7;

    const payload = {
      email: userEmail,
      attributes: {},
      listIds: [LIST_ID],
      updateEnabled: true
    };

    if (userFirstName) {
      payload.attributes.FIRSTNAME = userFirstName;
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    // 201 = Created, 204 = Updated
    if (response.status === 201 || response.status === 204) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, message: "Subscription successful" })
      };
    }

    const responseData = await response.json();

    // If contact already exists and was updated or reported duplicate
    if (responseData && (responseData.code === "duplicate_parameter" || responseData.code === "conflict")) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, message: "Contact already exists and has been updated." })
      };
    }

    console.error("Brevo API Error:", responseData);
    return {
      statusCode: response.status || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: responseData.message || "Failed to process subscription." })
    };

  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error." })
    };
  }
};
