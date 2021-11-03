import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useUser } from '../User';
import Link from 'next/link';
import SubredditContent from './SubredditContent';
import { CURRENT_USER_QUERY } from '../User';
import SubredditTopBar from './SubredditTopBar';
import checkUserToSubreddit from '../../lib/checkUser';

export const GET_SUBREDDIT_INFO= gql`
  query GetSubreddit($slug: String!) {
    Subreddit(slug: $slug) {
        id
        name
        title
        slug
        sidebar
        description
        status
        owner {
            username
        }
        moderators {
            username
        }
        createdAt
    }
  }
`;

export const SUBSCRIBE_TO_SUBREDDIT = gql`
    mutation SUBSCRIBE_TO_SUBREDDIT($id: ID!, $subreddit_id: ID!) {
        updateUser(
            id: $id,
            data: {
                subreddits: {
                    connect: {
                        id: $subreddit_id
                    }
                }
            }
        )
        {
            id
        }
    }
`;

export const UNSUBSCRIBE_TO_SUBREDDIT = gql`
    mutation UNSUBSCRIBE_TO_SUBREDDIT($id: ID!, $subreddit_id: ID!) {
        updateUser(
            id: $id,
            data: {
                subreddits: {
                    disconnect: {
                        id: $subreddit_id
                    }
                }
            }
        )
        {
            id
        }
    }
`;


function SubredditPage({type, slug, selftext}) {
    let [openRight, setOpenRight] = useState(false);
    const {loading, error, data} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: slug
        }
    });

    if (loading) {return <span>Loading...</span>}

    if(error) {console.log(error); return <span>Nothing to see here</span>}

    if (!data.Subreddit) return <span>Nothing Found</span>

    let Subreddit = data.Subreddit;

    return (
        <>
        {
           type && type === 'Home' && <SubredditTopBar 
                type={type}
                subreddit={Subreddit}
                slug={slug}
                subscribe={() => {subscribe}}
                unsubscribe={() => {unsubscribe}}
                openRight={(e) => {setOpenRight(e)}}
                right={openRight}
            />
        }
        <div className="subreddit-content" data-testid="subreddit-content">
            
                <SubredditContent right={openRight} selftext={selftext} slug={slug} subreddit={Subreddit} type={type} /> 
                    
        </div>
        </>
    );
}

export default SubredditPage;