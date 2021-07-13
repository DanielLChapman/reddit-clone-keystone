import React from 'react';
import PleaseSignIn from '../../../components/PleaseSignIn';
import SubredditPage from '../../../components/Subreddits/SubredditPage';
import { useUser } from '../../../components/User';

function SubmitPage(props) {
    const user = useUser();
   //need to be a subscriber of subreddit 
   let boolPass = false;
    if (user) {
        boolPass = user.subreddits.some((x) => {
            return x.slug === props.query.slug
        });

        if (!boolPass) {
            boolPass = user.owner.some((x) => {
                return x.slug === props.query.slug
            })
        }

        if (!boolPass) {
            boolPass = user.moderating.some((x) => {
                return x.slug === props.query.slug
            })
        }
    }
    return (
        <div>
                <PleaseSignIn>
                    {
                        boolPass ? <SubredditPage slug={props.query.slug} type="form" selftext={props.query.selftext} /> : <span>You Must Be Subscribed To This Subreddit</span>
                    }
                    
                </PleaseSignIn>
        </div>
    );
    
}

export default SubmitPage;