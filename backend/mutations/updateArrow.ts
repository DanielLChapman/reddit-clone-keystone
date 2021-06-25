
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { VoteCreateInput } from '../.keystone/schema-types';
import { withItemData } from '@keystone-next/keystone/session';
import { Post } from '../schemas/Post';
import { gql } from '@keystone-next/keystone/schema';


const graphql = String.raw;


async function updateArrow(
    root: any,
    {
       upOrDown,
       postOrCommentID,
       postOrComment,
    },
    context: KeystoneContext
): Promise<VoteCreateInput> {
    // 1. Query the current user see if they are signed in
    //This will be pre-done on front end but just to double check
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }

    //frontend builds this in, not the user
    //If its already upvoted, we ignore on the front end
    if (postOrComment === 'Post') {
        //1a. Check if user already has a vote on this post
        const votes = await context.lists.Vote.findMany({
            where: {
                AND: {
                    post: {
                        id: postOrCommentID
                    },
                    user: {
                        id: sesh.itemId
                    }
                }
            },
            resolveFields: graphql`
                        id
                        vflag
                    `,
        });
 
        if (votes) {
            console.log(votes[0]);
        } else {
            console.log('none');
        }

    
        
    } else {

        //1b. Check if user already has a vote on this comment

    }

    //2. If they do, delete it.

    //3. Create new vote

    //4. return new vote

    return null;
    
}

export default updateArrow;