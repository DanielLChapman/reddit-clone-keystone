import React from 'react';
import SubredditContent from './SubredditContent';


function SubredditPage(props) {
    console.log(props);
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