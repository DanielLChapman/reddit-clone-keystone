import React from 'react';
import PleaseSignIn from '../../../../components/PleaseSignIn'
import { useUser } from '../../../../components/User';
import { gql, useQuery } from '@apollo/client';
import SubredditEditPostForm from '../../../../components/Subreddits/SubredditEditPostForm';

// /user/post/post_id/edit

//get post content
const GET_POST_INFO = gql`
    query GET_POST_INFO($id: ID!) {
        Post(where: {
            id: $id
        }) {
            id
            content
            title
            post_slug
            subreddit {
                slug
            }
            user {
                username
                id
            }
        }
    }
`;

//update post content

function PostEditPage(props) {
    const user = useUser();

    const {data, error, loading} = useQuery(GET_POST_INFO, {
        variables: {
            id: props.query.post_id
        }
    });

    if (error) return <span>Error, try refreshing</span>
    if (loading) return <span>Loading... please wait</span>

    //verify that only the user can edit their own post

    //maybe later on administrators

    let boolPass = false;;

    if (user) {
        boolPass = user.id === data.Post.user.id;
    }

   //need to be logged in first
    return (
        <div>
            <PleaseSignIn>
                {
                    boolPass ? <SubredditEditPostForm post={data.Post} /> : 'Inaccessible, please leave'
                }
            </PleaseSignIn>
            <style>{"\
                body, html{\
                background-color:white;\
                }\
            "}</style>
        </div>
    );
}

export default PostEditPage;