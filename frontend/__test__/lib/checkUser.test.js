
import checkUserToSubreddit from '../../lib/checkUser';

describe('check user', () => {
    it ('finds out if user ia moderator or owner', () => {
        let user = {
            username: 'Rusty'
        };
        let moderators = [
            {username: 'Peach'},
            {username: 'Peach2'},
            {username: 'Peach3'},
            {username: 'Peach4'},
            {username: 'Rusty'},
        ]
        let owner = {username: 'Peach6'};

        expect(checkUserToSubreddit(user, moderators, owner)).toEqual(true);  

        moderators = [
            {username: 'Peach'},
            {username: 'Peach2'},
            {username: 'Peach3'},
            {username: 'Peach4'},
        ]
        expect(checkUserToSubreddit(user, moderators, owner)).toEqual(false);  
    });
})