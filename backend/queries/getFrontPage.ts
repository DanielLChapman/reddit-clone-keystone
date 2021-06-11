import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { PostListTypeInfo, PostRelateToManyInput, PostWhereInput } from '../.keystone/schema-types';
import {id_array} from '../lib/allSubreddits';
import { gql } from '@keystone-next/keystone/schema';

const graphql = String.raw;



async function getFrontPage(
    root: any,
    {name, skip },
    //totalToGrab
    //skip amount
    context: KeystoneContext
): Promise<PostWhereInput> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;

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

    //get 100, sort, display 50 and then store the next 50. On next load, add 100 in for now?
    //Maybe?

    const { data, errors } = await context.executeGraphQL({
        query: gql`
            query GET_POSTS($subreddits: [String], $skip: Float) {
                allPosts(subreddits: $subreddits, skip: $skip) {
                    user {
                        name
                        id
                    }
                    id
                    content
                    title
                    createdAt
                    votes   {
                        vflag
                    }
                    post_slug
                    link
                    type
                    
                }
    }
        `,
        variables: {
            subreddits,
            skip,
         },
      });


    return data.allPosts;

    //if amount is over 100 + total, and then skip the first and return only the end.


}

export default getFrontPage;