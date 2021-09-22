import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        username
        email
        name
        posts {
          votes {
            vflag
          }
        }
        comments {
          votes {
            vflag
          }
        }
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
        commentvotes {
          comment {
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
  let test = {...data};

  
  if (test.authenticatedItem) {
    let x = Object.assign({}, test.authenticatedItem);
    //count up post votes
    let postVotes = 0;
    let commentVotes = 0;
    
    x.posts.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? postVotes += 1 : postVotes -= 1;
      })
    });
    //count up comment votes
    x.comments.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? commentVotes += 1 : commentVotes -= 1;
      })
    });

    x.postVotes = postVotes;
    x.commentVotes = commentVotes;

    return x;
  } else {
    return data?.authenticatedItem;
  }

  
}
