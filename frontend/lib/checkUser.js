export default function checkUserToSubreddit(user, moderators, owner) {
    let toTest = [owner, ...moderators];

    //check if user is the owner
    return toTest.some((x)=> {
        if (x.username.toLowerCase() === user.username.toLowerCase()) {
            return true;
        }
    })
}