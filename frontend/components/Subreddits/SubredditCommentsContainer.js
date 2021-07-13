import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_VOTE, DELETE_VOTE, UPDATE_VOTE } from '../SmallPosts/PostMain';
import { CURRENT_USER_QUERY, useUser } from '../User';
import SubredditTopBar from './SubredditComments/CommentsTopBar';

const GET_POST_INFO = gql`
    query GET_POST_INFO($id: ID!) {
        Post( where: { id: $id } )
    {
        id
        content
        title
        user {
            id
            name
        }
        createdAt
        votes {
            vflag
        }
        post_slug
        link
        type

    }
    }
`;

function SubredditCommentsContainer(props) {
    const user = useUser();

    const {data, error, loading} = useQuery(GET_POST_INFO, {
        variables: {
            id: props.postid,
        }
    });

    if (error) return <span>Error...</span>
    if (loading) return <span>Loading...</span>

    console.log(data);

    

    
/*
    const [createPostVote, { data: data_create, error: error_create, loading: loading_create }] = useMutation(CREATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [deletePostVote, { data: data_delete, error: error_delete, loading: loading_delete }] = useMutation(DELETE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [updatePostVote, { data: data_update, error: error_update, loading: loading_update}] = useMutation(UPDATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
*/

    return (
        <div className="comment-page">
            <section className="comment-container">
                <SubredditTopBar user={user} post={data.Post} subreddit={props.subreddit}/>
            </section>
        </div>
    );
}

// SubredditCommentsContainer.propTypes = {
//     subreddit: PropTypes.object.isRequired,
//     postid: PropTypes.string.isRequired,

// }

export default SubredditCommentsContainer;