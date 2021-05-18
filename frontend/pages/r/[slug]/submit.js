import React from 'react';
import SubredditSubmitForm from '../../../components/SubredditSubmit';
import PleaseSignIn from '../../../components/PleaseSignIn';

function SubmitPage(props) {
   //need to be logged in first
   //need to be a subscriber of subreddit 
    return (
        <div>
            <PleaseSignIn>
            <SubredditSubmitForm /> {props.query.selftext}
            </PleaseSignIn>
        </div>
    );
}

export default SubmitPage;