import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

//maybe prevent certain subreddits from being created

export const Subreddit = list({
  fields: {
    name: text({ isRequired: true, isUnique: true }),
    title: text({isRequired: true}),
    slug: text({ isRequired: true, isUnique: true}),
    sidebar: text({
      ui: {
        displayMode: 'textarea',
      },
      defaultValue: 'Nothing Here Yet!'
    }),
    rules: text({
      ui: {
        displayMode: 'textarea',
      },
      defaultValue: 'Nothing Here Yet!'
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      defaultValue: 'Nothing Here Yet!'
    }),
    status: select({
      options: [
        { label: 'Public', value: 'PUBLIC' },
        { label: 'Private', value: 'PRIVATE' },
      ],
      defaultValue: 'PUBLIC',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    owner: relationship({
      ref: 'User.owner',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    moderators: relationship({
      ref: 'User.moderating',
      many: true
    }),
    subscriber: relationship({
      ref: 'User.subreddits',
      many: true
    }),
    posts: relationship({
        ref: 'Post.subreddit',
        many: true,
    }),
    createdAt: text({ 
      isRequired: true,
      defaultValue: () => {
          let date = new Date(Date.now()).toString();
          return date;
      },
  }),
    
  },
});