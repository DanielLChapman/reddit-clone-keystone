/* eslint-disable @typescript-eslint/indent */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const PostVote = list({

    fields: {
        post: relationship({
            ref: 'Post.votes',
            many: false,
        }),
        //comments later
        user: relationship({
            ref: 'User.postvotes',
            many: false,
            defaultValue: ({ context }) => ({
                connect: { id: context.session.itemId },
            }),
        }),
        vflag: select({
            options: [
              { label: 'Upvote', value: 'Upvote' },
              { label: 'Downvote', value: 'Downvote' },
            ],
            defaultValue: 'Upvote',
            ui: {
              displayMode: 'segmented-control',
              createView: { fieldMode: 'hidden' },
            },
        }),
    },
});
