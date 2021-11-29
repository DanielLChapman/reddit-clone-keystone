import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const Comment = list({
  fields: {
    content: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    user: relationship({
      ref: 'User.comments',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      many: false,
    }),
    post: relationship({
        ref: 'Post.comments',
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
        ref: 'CommentVote.comment',
        many: true,
    }),
    parent: relationship({
        ref: 'Comment.children',
        many: false,
    }),
    children: relationship({
        ref: 'Comment.parent',
        many: true,
    })
  },
});
