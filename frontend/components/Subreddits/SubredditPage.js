import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import SubredditContent from './SubredditContent';

const GET_SUBREDDIT_INFO = gql`
    query GET_SUBREDDIT_INFO($slug: String!) {
        allSubreddits(where: {
            slug: $slug
        }) {
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
        }
    }
`;

function SubredditPage(props) {

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.slug
        }
    });
    if (loading) return <span>Loading...</span>
    if(error) return <span>Nothing To See Here</span>

    console.log(data);
    return (
        <div className="subreddit-content">
            <div className="subreddit-left">
                {/* HArd coding news id, will grab from gql later */}
                <SubredditContent slug={props.slug} type={props.type} selftext={props.selftext} id='60944706438ea508cdf752c9' /> 

            </div>
            <div className="subreddit-right">
                blah
            </div>
        </div>
    );
}

export default SubredditPage;