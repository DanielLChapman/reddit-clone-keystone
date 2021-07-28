import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_VOTE, DELETE_VOTE, UPDATE_VOTE } from '../SmallPosts/PostMain';
import { CURRENT_USER_QUERY, useUser } from '../User';
import CommentsPage from './SubredditComments/CommentsPage';
import SubredditTopBar from './SubredditComments/CommentsPageTopBar';

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
            username
        }
        createdAt
        votes {
            vflag
        }
        post_slug
        link
        type
        comments {
            id
            parent {
                id
            }
            content
            createdAt
            user {
                id
                username
            }
        }

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

    return (
        <div className="comment-page">
            <SubredditTopBar user={user} post={data.Post} subreddit={props.subreddit}/>
            <section className="comment-container">
                
                <CommentsPage user={user} post={data.Post} subreddit={props.subreddit} />
            </section>
        </div>
    );
}

// SubredditCommentsContainer.propTypes = {
//     subreddit: PropTypes.object.isRequired,
//     postid: PropTypes.string.isRequired,

// }

export default SubredditCommentsContainer;