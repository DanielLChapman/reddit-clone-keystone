import getPostVoteId from "../../lib/getPostId";

describe('Get Post Id', () => {
    it ('describes getting the accurate post id', () => {
        let user = {
            username: 'Rusty',
            id: 1,
            postvotes: [
                {post: {id: 1}, id: 1},
                {post: {id: 141}, id: 2},
                {post: {id: 122}, id: 3},
                {post: {id: 123}, id: 4},
                {post: {id: 1124}, id: 5}
            ]
        }
        expect(getPostVoteId(user, 5)).toEqual(false);
        expect(getPostVoteId(user, 1124)).toEqual(5);
    })
})