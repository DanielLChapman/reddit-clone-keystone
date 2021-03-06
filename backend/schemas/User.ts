/* eslint-disable @typescript-eslint/indent */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, checkbox } from '@keystone-next/fields';
import { permissions, rules } from '../access';
import { frontpage} from '../lib/allSubreddits';

export const User = list({
    // access
    /* access: {
        create: () => true,
        read: rules.canManageUsers,
        update: rules.canManageUsers,
        //only people with the permission can delete themselves,
        // you can't delete yourself
        delete: permissions.canManageUsers,
    }, */
    // ui
    ui: {
        hideCreate: args => !permissions.canManageUsers(args),
        hideDelete: args => !permissions.canManageUsers(args),
    },
    fields: {
        name: text({ isRequired: true }),
        username: text({isRequired: true, isUnique: true}),
        case_username:text({isUnique: true, isRequired: true}),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        role: relationship({
            ref: 'Role.assignedTo',
            access: {
                create: permissions.canManageUsers,
                update: permissions.canManageUsers
            }
        }),
        // differentiation between admin and member of.
        owner: relationship({ ref: 'Subreddit.owner', many: true }),
        moderating: relationship({ref: 'Subreddit.moderators', many: true}),
        subreddits: relationship({ 
            ref: 'Subreddit.subscriber', 
            many: true,
        }),
        posts: relationship({
            ref: 'Post.user',
            many: true,
        }),
        postvotes: relationship({
            ref: 'PostVote.user',
            many: true,
        }),
        firstSignin: checkbox({
            defaultValue: false,
            label: 'User has signed in before',
        }),
        comments: relationship({
            ref: 'Comment.user',
            many: true,
        }),
        commentvotes: relationship({
            ref: 'CommentVote.user',
            many: true,
        }),
    },
});
