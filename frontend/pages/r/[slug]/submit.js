import React from 'react';
import PleaseSignIn from '../../../components/PleaseSignIn';

function SubmitPage(props) {
   //need to be logged in first

   //need to be a subscriber of subreddit 

    return (
        <div>
                
                hi
                {props.query.slug}
                {props?.query?.selftext}
        </div>
    );
}

export default SubmitPage;