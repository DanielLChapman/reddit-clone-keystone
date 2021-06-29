import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useUser } from '../User';
import Link from 'next/link';
import SubredditContent from './SubredditContent';

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

function SubredditPage(props) {
    const user = useUser();

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.slug
        }
    });

    
    if (loading) return <span>Loading...</span>
    if(error) return <span>Nothing To See Here</span>
    return (
        <div className="subreddit-content">
                {/* HArd coding news id, will grab from gql later */}
                <SubredditContent slug={props.slug} subreddit={data?.allSubreddits[0]} type={props.type} /> 
                    
        </div>
    );
}

export default SubredditPage;