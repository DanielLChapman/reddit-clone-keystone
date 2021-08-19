export default function getPostVoteId(user, postid) {
    let id = user?.postvotes?.find((x) => {
        if (x?.post?.id === postid) {
            return x.id;
        }
    });

    return id.id;
}