import React from 'react';
import SubredditSubmitForm from '../../components/SubredditSubmit';
import PleaseSignIn from '../../components/PleaseSignIn';

function SubredditCreatePage(props) {
   //need to be logged in first
   //need to be a subscriber of subreddit 
    return (
        <div>
            <PleaseSignIn>
            <SubredditSubmitForm />
            </PleaseSignIn>
            <style>{"\
                body, html{\
                background-color:white;\
                }\
            "}</style>
        </div>
    );
}

export default SubredditCreatePage;