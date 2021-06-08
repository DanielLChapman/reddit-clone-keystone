import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { PostWhereInput } from '../.keystone/schema-types';
import id_frontpage from '../lib/allSubreddits';

const graphql = String.raw;

async function getFrontPage(
    root: any,
    {name}: {name: string},
    //totalToGrab
    //skip amount
    context: KeystoneContext
): Promise<PostWhereInput> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;

    //get list of subreddits to use
    //use default subreddits
    let subreddits = id_frontpage;

    if (sesh.itemId) {
        console.log('here');
        //use users subreddits
        let userSubreddits = await context.lists.User.findOne({
            where: {
                id: sesh.itemId,
            },
            resolveFields: graphql`
                subreddits {
                    id
                    posts {
                        id
                    }
                }
            `
        })

        subreddits = userSubreddits.subreddits;
        console.log(subreddits);
    }

    //get posts 

    //if amount is over 100 + total, and then skip the first and return only the end.

    return null;

}

export default getFrontPage;