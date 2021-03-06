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
    title: text(),
    user: relationship({
      ref: 'User.posts',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      many: false,
    }),

    subreddit: relationship({
        ref: 'Subreddit.posts',
        many: false,
    }),
    createdAt: text({ 
        isRequired: true,
        defaultValue: () => {
            let date = new Date(Date.now()).toString();
            return date;
        },
    }),
    votes: relationship({
        ref: 'PostVote.post',
        many: true,
    }),
    post_slug: text({isRequired: true, isUnique: true}),
    link: text(),
    type: text(),
    comments: relationship({
      ref: 'Comment.post',
      many: true,
    }),
    removed: select({
      options: [
        { label: 'True', value: 'True' },
        { label: 'False', value: 'False' },
      ],
      defaultValue: 'False',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
  }),
  },
});
