
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { PostCreateInput } from '../.keystone/schema-types';
import { withItemData } from '@keystone-next/keystone/session';
import { Post } from '../schemas/Post';

const graphql = String.raw;


async function createTextPost(
    root: any,
    {
        title,
        content,
        subreddit_id,
    },
    context: KeystoneContext
): Promise<PostCreateInput> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }

    //post slug
    let postslug = title.toLowerCase().trim();
    postslug = postslug.split(' ').join('_');
    postslug = postslug.substring(0, 20);

    return await context.lists.Post.createOne({
        data: {
            user: { connect: { id: sesh.itemId } },
            subreddit: { connect: { id: subreddit_id}},
            content: content,
            title: title,
            post_slug: postslug,
            type: 'text',
        },
        resolveFields: graphql`
            id
            title
            content
            post_slug
        `,
    })
}

export default createTextPost;