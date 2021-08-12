import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
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
    const user = useUser();

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.slug
        }
    });

    
    
    if (loading) return <span>Loading...</span>

    if(error) return <span>Nothing To See Here</span>

    //lets define if the user is a moderator or owner here to pass down as props to the contentll
    let ownership = checkUserToSubreddit(user, data.allSubreddits[0].moderators, data.allSubreddits[0].owner)
    return (
        <>
        {
           props.type && props.type === 'Home' && <SubredditTopBar 
                type={props.type}
                subreddit={data?.allSubreddits[0]}
                slug={props.slug}
                subscribe={() => {subscribe}}
                unsubscribe={() => {unsubscribe}}
            />
        }
        <div className="subreddit-content">
                <SubredditContent ownership={ownership} slug={props.slug} subreddit={data?.allSubreddits[0]} type={props.type} /> 
                    
        </div>
        </>
    );
}

export default SubredditPage;