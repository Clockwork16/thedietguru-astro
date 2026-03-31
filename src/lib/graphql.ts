const WP_GRAPHQL_URL = 'https://thedietguru.org/backend/index.php?graphql';

export interface GraphQLResponse<T = any> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const text = await response.text();
  
  try {
    const json = JSON.parse(text);
    return json.data;
  } catch (e) {
    console.error("Engine returned HTML. Check WP settings.");
    throw new Error("Server Error: Received HTML instead of JSON");
  }
} // ─── Common Queries ──────────────────────────────────────────────

export const GET_POSTS = `
  query GetPosts($first: Int = 20) {
    posts(first: $first) {
      nodes {
        slug
        title
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes { name slug }
        }
        author {
          node { name }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes { name slug }
      }
      tags {
        nodes { name slug }
      }
      author {
        node { name }
      }
    }
  }
`;

export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_ALL_BLOG_POSTS = `
  query GetAllBlogPosts {
    posts(first: 100, where: { categoryIn: [46, 45, 49, 47, 44] }) {
      nodes {
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            databaseId
            name
          }
        }
      }
    }
  }
`;

export const GET_RECIPES = `
  query GetRecipes($first: Int = 20) {
    posts(first: $first, where: { categoryId: 51 }) {
      nodes {
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;
