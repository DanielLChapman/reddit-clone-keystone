import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        username
        email
        name
        moderating {
          id
          slug
          name
        }
        owner {
          id
          slug
          name
        }
        subreddits {
          id
          slug
          name
        }
        postvotes {
          post {
            title
            id
          }
          id
          vflag
        }
    }
  }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
