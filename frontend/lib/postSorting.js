import { rawConvertDateFromNow } from "./convertDateFromNow";

export function totalPostsVotes(post) {
    let count = 1; 
    post.votes.forEach((x) => {
        x.vflag === 'Upvote' ? count += 1 : count -= 1;
    });

    return count;
}

export default function sortingPosts(posts, sortType) {
    let unsortedPosts = posts;
    switch(sortType) {
        case 'Best':
            unsortedPosts = posts.map((x) => {
        
                //count votes
                let score = 1;
                let numVotes = x.votes.length;
                numVotes === 0 ? numVotes = 1 : '';
                
                x.votes.forEach((y) => {
                    y.vflag === 'Upvote' ? score += 1 : score -= 1;
                });
            
                let total = score;
                let revisedScore = score/numVotes;
                revisedScore === 0 ? revisedScore -= 1 : '';
            
                let date = rawConvertDateFromNow(x.createdAt);
                score = revisedScore/date;
            
                return {...x, score, total};
            })

            return unsortedPosts.sort((a,b) => (a.score < b.score) ? 1 : -1);

        default: 
            return posts;
    }
}
