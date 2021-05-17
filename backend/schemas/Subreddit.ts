import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const Subreddit = list({
  fields: {
    name: text({ isRequired: true, isUnique: true }),
    slug: text({ isRequired: true, isUnique: true}),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Public', value: 'PUBLIC' },
        { label: 'Private', value: 'Private' },
      ],
      defaultValue: 'PUBLIC',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    owner: relationship({
      ref: 'User.moderator',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      many: true,
    }),
    subscriber: relationship({
      ref: 'User.subreddits',
      many: true
    }),
    posts: relationship({
        ref: 'Post.subreddit',
        many: true,
    }),
  },
});