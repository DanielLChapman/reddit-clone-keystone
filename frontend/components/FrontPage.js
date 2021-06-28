import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import PostMain from './SmallPosts/PostMain';
import { useUser } from './User';
import { id_array  } from '../lib/allSubreddits'
import {rawConvertDateFromNow} from '../lib/convertDateFromNow';


// get front page posts, sorted by some algorithm (upvotes / time posted for now)
const GET_FRONT_PAGE_POSTS = gql`
    query GET_FRONT_PAGE_POSTS($subreddits: [ID]!, $skip: Int) {
        allPosts(
            
            where: {
                subreddit: {
                    id_in: $subreddits
                }
            },
            skip: $skip,
            first: 200,
        ) {
            id
            content
            title
            user {
            id
            name
            }
            createdAt
            votes {
            vflag
            }
            post_slug
            link
            type
            subreddit {
                name
                id
                slug
            }
        }
    }
`;

function FrontPage(props) {
    const user = useUser();
    let subreddits;
    if (user?.subreddits) {
        subreddits = user.subreddits.map((x) => {
            return x.id
        });
    } else {
        subreddits = id_array;
    } 

    const {data, error, loading} = useQuery(GET_FRONT_PAGE_POSTS,{
        variables: {
            subreddits: subreddits,
            skip: 0,
        }
    });
        
    

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error.error}</div>

    let posts = data?.allPosts;
    //sorting posts by votes / posted times

    let scoredPosts = posts.map((x) => {
        
        //count votes
        let score = 1;
        let numVotes = x.votes.length;
        numVotes === 0 ? numVotes = 1 : '';
        
        x.votes.forEach((y) => {
            y.vflag === 'Upvote' ? score += 1 : score -= 1;
        });

        let revisedScore = score/numVotes;
        revisedScore === 0 ? revisedScore -= 1 : '';

        let date = rawConvertDateFromNow(x.createdAt);
        score = revisedScore/date;

        return {...x, score};
    })

    posts = scoredPosts.sort((a,b) => (a.score < b.score) ? 1: -1);
    console.log(posts);
    return (
        
        <div className="frontpage-content">
            <section className="left-side">
                {
                    posts && posts.map((x) => {
                        return <PostMain post={x} key={x.id} />
                    })
                }
            </section>
            <section className="right-side">
                { user && (
                        <Link href="/subreddits/create">Create Your Own Subreddit</Link>
                    )
                }

            </section>
            
            
        </div>
    );
}

export default FrontPage;