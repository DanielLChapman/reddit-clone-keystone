import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { PostListTypeInfo, PostRelateToManyInput, PostWhereInput, SubredditWhereInput } from '../.keystone/schema-types';
import {id_array} from '../lib/allSubreddits';
import { gql } from '@keystone-next/keystone/schema';
import bestMatch from '../lib/getEditDistance';

const graphql = String.raw;



async function getSearchResults(
    root: any,
    {searchTerm}: {searchTerm: string},
    //totalToGrab
    //skip amount
    context: KeystoneContext
): Promise<SubredditWhereInput> {

    //perform search on subreddits
    let subreddits = await context.lists.Subreddit.findMany({
        where: {
            AND: [
                {name_contains_i: searchTerm},
                {status: 'PUBLIC'}
                //some way to throw an id in here to see if you are the owner or moderating a private sub
                //{OR: [{status: 'PUBLIC'}]},
            ]
            
        },
        resolveFields: graphql`
            id
            title
            subscriber {
                id
            }
            slug
            name
        `
    });

    console.log(subreddits);


    //sort results
    if (subreddits.length > 1) {
        subreddits = bestMatch(subreddits, searchTerm || '', 'title').reverse();
    }
   

    //if over 5, slice
    if (subreddits.length > 5) {
        subreddits = subreddits.slice(0, 5);
    }

    //return the rest
    return subreddits;


    //if amount is over 100 + total, and then skip the first and return only the end.


}

export default getSearchResults;