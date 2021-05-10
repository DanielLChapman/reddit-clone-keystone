
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { UserUpdateInput } from '../.keystone/schema-types';
import {frontpage, id_frontpage} from '../lib/allSubreddits';
import { withItemData } from '@keystone-next/keystone/session';

async function subscribeToDefault(
    root: any,
    {id}: {id: string},
    context: KeystoneContext
): Promise<UserUpdateInput> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }


    return await context.lists.User.updateOne({
        id: sesh.itemId,
        data: {
            firstSignin: true,
            subreddits: {
                connect:[{
                  id: "609446a1438ea508cdf752c3"
                },
                {
                  id: "609446b8438ea508cdf752c4"
                },
                {
                  id: "609446c3438ea508cdf752c5"
                },
                {
                  id: "609446cf438ea508cdf752c6"
                },
                {
                  id: "609446e0438ea508cdf752c7"
                },
                {
                  id: "609446fa438ea508cdf752c8"
                },
                {
                  id: "60944706438ea508cdf752c9"
                }] 
              }
        }
    });


    /*
    let user = await context.lists.User.updateOne({
        id: sesh.itemId,
        data: {
            subreddits: {
                connect: id_frontpage
            }
        }
    });

    console.log(user);*/
}

export default subscribeToDefault;