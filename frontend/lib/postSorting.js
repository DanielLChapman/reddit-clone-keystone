import { rawConvertDateFromNow } from "./convertDateFromNow";

export function totalPostsVotes(post) {
    let count = 0; 
    post.votes?.forEach((x) => {
        x.vflag === 'Upvote' ? count += 1 : count -= 1;
    });

    return count;
}

export default function sortingPosts(posts, sortType) {
    let unsortedPosts = posts;
    
    try {
        switch(sortType) {
            case 'Best':
                unsortedPosts = posts?.map((x) => {
                    let upvotes = 0, downvotes = 0;
                    x.votes.forEach((y) => {
                        y.vflag === 'Upvote' ?
                            upvotes += 1 || 1 :
                            downvotes += 1 || 1;
    
                    });
                    let ratio = upvotes / downvotes;
    
                    return {...x, ratio}
    
                });
    
                return unsortedPosts.sort((a,b) => (a.ratio > b.ratio) ? 1 : -1);
            case 'Hot':
                unsortedPosts = posts?.map((x) => {
            
                    //count votes
                    let score = 0;
                    let numVotes = x.votes.length;
                    numVotes === 0 ? numVotes = 1 : '';
                    
                    x.votes.forEach((y) => {
                        y.vflag === 'Upvote' ? score += 1 : score -= 1;
                    });
                
                    let total = score;
                    let revisedScore = score/numVotes;
                    revisedScore === 0 ? revisedScore -= 1 : '';
                
                    let date = rawConvertDateFromNow(x.createdAt);
                    score = Math.log( 5*revisedScore/(date/.25));
                
                    return {...x, score, total};
                })
    
                return unsortedPosts.sort((a,b) => (a.score < b.score) ? 1 : -1);
            case 'New':
                let posts = [...unsortedPosts].sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                
                return posts;
            case 'Top':
                unsortedPosts = posts?.map((x) => {
            
                    //count votes
                    let score = 0;
                    x.votes.forEach((y) => {
                        y.vflag === 'Upvote' ? score += 1 : score -= 0;
                    });
            
                
                    return {...x, score};
                });
                return unsortedPosts.sort((a,b) => (a.score > b.score) ? 1 : -1);
                //
            default: 
                return posts;
        }
    } catch(err) {
        return posts;
    }

   
    
}

export function sortingComments(comments, sortType) {
    let unsortedComments = comments;
    if (comments.length === 0) {
        return comments;
    }
    try {
        switch(sortType) {
            case 'Best':
                unsortedComments = comments.map((x) => {
                    let upvotes = 0, downvotes = 0;
                    x.commentObject.votes.forEach((y) => {
                        y.vflag === 'Upvote' ?
                            upvotes += 1 || 1 :
                            downvotes += 1 || 1;
    
                    });
                    let ratio = upvotes / downvotes;
    
                    return {...x, ratio}
    
                });
    
                return unsortedComments.sort((a,b) => (a.commentObject.ratio > b.commentObject.ratio) ? 1 : -1);
            case 'Hot':
                unsortedComments = comments.map((x) => {
            
                    //count votes
                    let score = 0;
                    let numVotes = x.commentObject.votes.length;
                    numVotes === 0 ? numVotes = 1 : '';
                    
                    x.commentObject.votes.forEach((y) => {
                        y.vflag === 'Upvote' ? score += 1 : score -= 1;
                    });
                
                    let total = score;
                    let revisedScore = score/numVotes;
                    revisedScore === 0 ? revisedScore -= 1 : '';
                
                    let date = rawConvertDateFromNow(x.commentObject.createdAt);
                    score = Math.log( 5*revisedScore/(date/.25));
                
                    return {...x, score, total};
                });
    
                return unsortedComments.sort((a,b) => (a.score < b.score) ? 1 : -1);
            case 'New':
                let posts = [...unsortedComments].reverse();
                
                return posts;
            case 'Top':
                unsortedComments = comments.map((x) => {
            
                    //count votes
                    let score = 0;
                    x.commentObject.votes.forEach((y) => {
                        y.vflag === 'Upvote' ? score += 1 : score -= 0;
                    });
            
                
                    return {...x, score};
                });
                return unsortedComments.sort((a,b) => (a.commentObject.score > b.commentObject.score) ? 1 : -1);
            default: 
                return comments;
        }
    }
    catch (err) {
        return comments;
    }
    
}