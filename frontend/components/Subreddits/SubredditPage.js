import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useUser } from '../User';
import Link from 'next/link';
import SubredditContent from './SubredditContent';
import { CURRENT_USER_QUERY } from '../User';

const GET_SUBREDDIT_INFO = gql`
    query GET_SUBREDDIT_INFO($slug: String!) {
        allSubreddits(where: {
            slug: $slug
        }) {
            id
            name
            title
            sidebar
            description
            status
            owner {
                name
            }
            moderators {
                name
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

    const [subscribe, {data:subscribeData, error: subscribeError, loading: subscribeLoading}] = useMutation(SUBSCRIBE_TO_SUBREDDIT, {
        variables: {
            id: user.id,
            subreddit_id: data.allSubreddits[0].id
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })

    const [unsubscribe, {data:unSubscribeData, error: unSubscribeError, loading: unSubscribeLoading}] = useMutation(UNSUBSCRIBE_TO_SUBREDDIT, {
        variables: {
            id: user.id,
            subreddit_id: data.allSubreddits[0].id
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
    
    return (
        <>
        {
            props.type === 'Home' && (
                <section className="subreddit-top-bar">
                    <section className="subreddit-top-bar-content">
                        <section className="subreddit-top-bar-name">
                            <h1>{data?.allSubreddits[0].name}</h1>
                            <button onClick={ () => {
                                let subscribed = user.subreddits.some((x) => {
                                    return x.id === data?.allSubreddits[0].id
                                })  

                                subscribed ? unsubscribe() : subscribe()
                            }
                                
                            }>{user.subreddits.some((x) => {
                                return x.id === data?.allSubreddits[0].id
                            }) ? 'Leave' : 'Join'}</button>
                        </section>
                        <span>
                            r/{props.slug}
                        </span>
                    </section>
                    
                </section>
            )
        }
        <div className="subreddit-content">
                {/* HArd coding news id, will grab from gql later */}
                <SubredditContent slug={props.slug} subreddit={data?.allSubreddits[0]} type={props.type} /> 
                    
        </div>
        </>
    );
}

export default SubredditPage;