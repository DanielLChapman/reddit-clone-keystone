import { useQuery } from '@apollo/client';
import React from 'react';
import SubredditContent from '../../../../../components/Subreddits/SubredditContent';
import { GET_SUBREDDIT_INFO } from '../../../../../components/Subreddits/SubredditPage';

function Posts(props) {

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.query.slug
        }
    });

    if (error) return <span>Error... Please try again later</span>
    if (loading) return <span>Loading....</span>

    return (
        <div>
            <SubredditContent type="comment" slug={props.query.slug} postslug={props.query.post_slug} postid={props.query.id} subreddit={data.allSubreddits[0]}/>
        </div>
    );
}

export default Posts;