import React from 'react';
import Link from 'next/link';
import { useUser } from '../User';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import sortingPosts from '../../lib/postSorting';
import PostMain from '../SmallPosts/PostMain';

export const GET_POSTS_FROM_SUBREDDIT = gql`
    query GET_POSTS_FROM_SUBREDDIT($id: ID!, $skip: Int) {
        allPosts(
            where: {
                subreddit: {
                    id: $id
                },
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
    

function SubredditHomePage(props) {
    const user = useUser();
    const {data, error, loading} = useQuery(GET_POSTS_FROM_SUBREDDIT, {
        variables: {
            id: props?.id,
            skip: 0
        }
    }) 

    if (error) return <span>Nothing to see here!</span>
    if (loading) return <span>Loading....</span>

    let posts = data.allPosts;

    posts = sortingPosts(posts, 'Best');

    return (
        <div className="subreddit-content">
            <div className="subreddit-left">
               {
                    posts && posts.map((x) => {
                        return <PostMain post={x} key={x.id} />
                    })
                }
            </div>
            <div className="subreddit-right">
                { user && (
                        <div>
                            <div className="block-link">
                                <Link href={`/r/${props.slug}/submit`}>
                                    Create a Link Post
                                </Link>
                            </div> 
                            
                            <div className="block-link">
                                <Link href={`/r/${props.slug}/submit?selftext=true`}>
                                    Create a Text Post
                                </Link>    
                            </div> 
                            
                        </div>
                    )
                }
        
            </div>
        </div>
    )
        
}

SubredditHomePage.propTypes = {
    id: PropTypes.string.isRequired,

}

export default SubredditHomePage;