import React from 'react';
import PleaseSignIn from '../../../components/PleaseSignIn';
import SubredditPage from '../../../components/Subreddits/SubredditPage';

function SubmitPage(props) {
   //need to be logged in first

   //need to be a subscriber of subreddit 

    return (
        <div>

                <PleaseSignIn>
                <SubredditPage slug={props.query.slug} type="form" selftext={props.query.selftext} />
                </PleaseSignIn>
        </div>
    );
}

export default SubmitPage;