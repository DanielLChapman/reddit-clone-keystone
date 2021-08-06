
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { PostCreateInput } from '../.keystone/schema-types';
import { withItemData } from '@keystone-next/keystone/session';
import { Post } from '../schemas/Post';

const graphql = String.raw;

//https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}

async function createVariedPost(
    root: any,
    {
        title,
        content,
        subreddit_id,
        type,
        link,
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

    let newPost;
    if (type === "text") {
        newPost = await context.lists.Post.createOne({
            data: {
                user: { connect: { id: sesh.itemId } },
                subreddit: { connect: { id: subreddit_id}},
                content: content,
                title: title,
                post_slug: postslug,
                type: 'text',
                link: '',
            },
            resolveFields: graphql`
                id
                title
                content
                post_slug
            `,
        })
    } else {
        try {
            newPost = await context.lists.Post.createOne({
                data: {
                    user: { connect: { id: sesh.itemId } },
                    subreddit: { connect: { id: subreddit_id}},
                    title: title,
                    post_slug: postslug,
                    type: type,
                    link: link,
                },
                resolveFields: graphql`
                    id
                    title
                    link
                    post_slug
                `,
            })
        } catch(err) {
            let error = err.message.toString().substring(0, 6);
            switch (error) {
                case 'E11000':
                    postslug = postslug + "_" + uuidv4().substring(0,12);
                    newPost = await context.lists.Post.createOne({
                        data: {
                            user: { connect: { id: sesh.itemId } },
                            subreddit: { connect: { id: subreddit_id}},
                            title: title,
                            post_slug: postslug,
                            type: type,
                            link: link,
                        },
                        resolveFields: graphql`
                            id
                            title
                            link
                            post_slug
                        `,
                    })
                    break;
                default:
    
                    console.log(error);
            }
        }
        
    }

    let postvote = await context.lists.PostVote.createOne({
        data: {
            vflag: 'Upvote',
            post: {
                connect: {
                    id: newPost.id
                }
            }
        }
    });

    return newPost;
    

    //return newPost;
}

export default createVariedPost;