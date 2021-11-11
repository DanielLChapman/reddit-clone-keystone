import { CURRENT_USER_QUERY } from '../../components/User';
import { fakeTextPost, fakeUser} from '../../lib/testUtils';

const fakeUserObj = fakeUser();
const notSignedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: null } },
    },
  ];
  
const signedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: fakeUser() /*{
        
            id: fakeUserObj.id,
            username: fakeUserObj.username,
            email: fakeUserObj.email,
            name:fakeUserObj.name,
            posts: [],
            comments: [],
            moderating: [],
            owner:[],
            subreddits:[],
            postvotes:[],
            commentvotes: [],
        
      }*/ } },
    },
  ];
  
const signedInMocksWithPosts = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: {
        data: {
          authenticatedItem: fakeUser({
            posts: [fakeTextPost()],
          }),
        },
      },
    },
];

export {
    notSignedInMocks,
    signedInMocks,
    signedInMocksWithPosts
}

/* 

{
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

    */