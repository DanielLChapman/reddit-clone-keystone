import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const Post = list({
  fields: {
    content: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    user: relationship({
      ref: 'User.posts',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    children: relationship({
        ref: 'Post',
        many: true,
    }),
    parent: relationship({
        ref: 'Post',
        many: false,
    }),
    subreddit: relationship({
        ref: 'Subreddit.posts',
        many: false,
    }),
    createdAt: text({ 
        isRequired: true,
        defaultValue: () => {
            let date = new Date();
            return date.toLocaleDateString();
        },
    }),
    votes: relationship({
        ref: 'Vote.post',
        many: true,
    }),
    
  },
});
