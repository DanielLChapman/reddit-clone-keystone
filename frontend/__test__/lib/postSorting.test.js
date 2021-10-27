import capitalize from '../../lib/capitalize';
import sortingPosts, { sortingComments, totalPostsVotes } from '../../lib/postSorting';

describe('vote counting', () => {
    it ('totalPostsVotes', () => {
        let post = {
            votes: [
                {vflag: 'Upvote'}
            ]
        };
        expect(totalPostsVotes(post)).toEqual(1);  
        post = {
            votes: [
                {vflag: 'Upvote'},
                {vflag: 'Upvote'}
            ]
        };
        expect(totalPostsVotes(post)).toEqual(2);  
        post = {
            votes: [
                {vflag: 'Downvote'},
                {vflag: 'Downvote'},
                {vflag: 'Downvote'},
                {vflag: 'Upvote'}
            ]
        };
        expect(totalPostsVotes(post)).toEqual(-2); 
    });
});

describe('sorting', () => {
    it ('posts-new', () => {
        let posts = [{
                title: 'Test',
                votes: [
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test2',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test3',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
        ];
        expect(sortingPosts(posts, 'New')).toEqual([{"createdAt": "Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test", "votes": [{"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test3", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test2", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}]}]);  
        
    });
    it ('posts-hot', () => {
        let posts = [{
                title: 'Test',
                votes: [
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test2',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test3',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
        ];
        expect(sortingPosts(posts, 'Hot')).toEqual([{"createdAt": "Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test", "votes": [{"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test2", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test3", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}]}]);
    });
    it ('comments-hot', () => {
        let posts = [{
                title: 'Test',
                votes: [
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test2',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
            {
                title: 'Test3',
                votes: [
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'},
                    {vflag: 'Upvote'}
                ],
                createdAt: 'Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)'
            },
        ];
        expect(sortingComments(posts, 'Hot')).toEqual([{"createdAt": "Mon Jun 14 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test", "votes": [{"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 12 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test2", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}]}, {"createdAt": "Mon Jun 13 2021 15:56:11 GMT-0400 (Eastern Daylight Time)", "title": "Test3", "votes": [{"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}, {"vflag": "Upvote"}]}]);
    });
});