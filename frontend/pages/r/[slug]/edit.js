import React from 'react';
import SubredditEdit from '../../../components/SubredditEdit';
import PleaseSignIn from '../../../components/PleaseSignIn';
import { useUser } from '../../../components/User';
import { useQuery } from '@apollo/client';
import { GET_SUBREDDIT_INFO } from '../../../components/Subreddits/SubredditPage';


function SubredditEditPage(props) {
    const user = useUser();

    let boolPass = false;
    if (user) {
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

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.query.slug
        }
    });

    if (error) return <span>Error... Please try again later</span>
    if (loading) return <span>Loading....</span>

    //get the subreddit info here to pass and make sure the owner is the owner of the subreddit
    //Maybe moderator too?

   //need to be logged in first
    return (
        <div>
            <PleaseSignIn>
                { boolPass ?  <SubredditEdit subreddit={data.allSubreddits[0]} /> : <div><span>You dont have the required permission for this.</span></div> }
            </PleaseSignIn>
            <style>{"\
                body, html{\
                background-color:white;\
                }\
            "}</style>
        </div>
    );
}

export default SubredditEditPage;