/* eslint-disable @typescript-eslint/indent */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const Vote = list({

    fields: {
        post: relationship({
            ref: 'Post.votes',
            many: false,
        }),
        user: relationship({
            ref: 'User.votes',
            many: false,
        }),
        vflag: select({
            options: [
              { label: 'Upvote', value: 'UPVOTE' },
              { label: 'Downvote', value: 'Downvote' },
            ],
            defaultValue: 'PUBLIC',
            ui: {
              displayMode: 'segmented-control',
              createView: { fieldMode: 'hidden' },
            },
        }),
    },
});
