import React from 'react';
import SubredditContent from './SubredditContent';


function SubredditPage(props) {
    return (
        <>
            <div class="subreddit-left">
                <SubredditContent slug={props.slug} type={props.type} /> 

            </div>
            <div class="subreddit-right">
                blah
            </div>
        </>
    );
}

export default SubredditPage;