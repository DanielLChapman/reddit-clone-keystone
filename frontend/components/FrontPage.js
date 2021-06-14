import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import PostMain from './SmallPosts/PostMain';
import { useUser } from './User';
import { id_array  } from '../lib/allSubreddits'


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
    return (
        
        <div>
            

            { user && (
                    <Link href="/subreddits/create">Create Your Own Subreddit</Link>
                 )
            }

            {
                posts && posts.map((x) => {
                    return <PostMain post={x} key={x.id} />
                })
            }
        </div>
    );
}

export default FrontPage;