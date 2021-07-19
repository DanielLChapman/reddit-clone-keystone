/* eslint-disable @typescript-eslint/indent */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const CommentVote = list({

    fields: {
        comment: relationship({
            ref: 'Comment.votes',
            many: false,
        }),
        //comments later
        user: relationship({
            ref: 'User.commentvotes',
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
