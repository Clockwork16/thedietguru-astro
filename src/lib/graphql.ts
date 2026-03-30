const WP_GRAPHQL_URL = 'https://thedietguru.org/backend/graphql';

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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
  }

  return json.data;
}

// ─── Common Queries ──────────────────────────────────────────────

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
    posts(first: 100, where: { categoryIn: [1, 3, 4, 6, 16, 19, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 68] }) {
      nodes {
        slug
        title
        categories {
          nodes {
            databaseId
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
