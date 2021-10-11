import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useUser } from '../User';
import Link from 'next/link';
import SubredditContent from './SubredditContent';
import { CURRENT_USER_QUERY } from '../User';
import SubredditTopBar from './SubredditTopBar';
import checkUserToSubreddit from '../../lib/checkUser';

export const GET_SUBREDDIT_INFO = gql`
    query GET_SUBREDDIT_INFO($slug: String!) {
        allSubreddits(where: {
            slug: $slug
        }) {
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

function SubredditPage(props) {
    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.slug
        }
    });

    let [openRight, setOpenRight] = useState(false);

    
    
    if (loading) return <span>Loading...</span>

    if(error) return <span>Nothing To See Here</span>
    if (data.allSubreddits.length === 0) {
        return <span>Nothing to see here</span>
    }

    return (
        <>
        {
           props.type && props.type === 'Home' && <SubredditTopBar 
                type={props.type}
                subreddit={data?.allSubreddits[0]}
                slug={props.slug}
                subscribe={() => {subscribe}}
                unsubscribe={() => {unsubscribe}}
                openRight={(e) => {setOpenRight(e)}}
                right={openRight}
            />
        }
        <div className="subreddit-content">
            
                <SubredditContent right={openRight} selftext={props.selftext} slug={props.slug} subreddit={data?.allSubreddits[0]} type={props.type} /> 
                    
        </div>
        </>
    );
}

export default SubredditPage;