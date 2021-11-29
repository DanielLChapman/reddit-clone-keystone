import {id_array} from '../lib/allSubreddits';
import { KeystoneContext, SessionStore } from '@keystone-next/types';


const getFrontPage = async (_, { name, skip }, context) => {

    // 1. Query the current user see if they are signed in
    const sesh = context.session;

    //get list of subreddits to use
    //use default subreddits
    let subreddits = id_array;

    let frontPageSubreddits;

    if (sesh?.itemId) {
        console.log('here');
        //use users subreddits
        let userSubreddits = await context.lists.User.findOne({
            where: {
                id: sesh.itemId,
            },
            resolveFields: graphql`
                subreddits {
                    id
                }
            `
        });

        subreddits = userSubreddits.map((x) => {
            return x.id;
        }) 
    }

    const {
        data: {post},
    } = await context.executeGraphql({
        query: `
            allPost(where: {
                subreddit:{
                    id_in: ${subreddits}
                }
            },
            first: 200,
            skip: ${skip})
            ) 
                {
                    id
                                  content
                                  title
                                  user {
                                      id
                                      name
                                  }
                                  createdAt
                                  votes   {
                                      vflag
                                  }
                                  post_slug
                                  link
                                  type
                  
            }
            
        `
    })

    console.log(data);
/*

    const {
      data: { views },
    } = await context.executeGraphql({
      query: `
      Post(where: { id: "${id}" }) {
        views
      }
    `,
    });
  
    return views > threshold;*/


  };
  

export default getFrontPage;