import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import convertDateFromNow from '../../lib/convertDateFromNow'; 
import MediaPost from './MediaPost';
import TextPost from './TextPost';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';
import { useUser } from '../User';
import PostLeftSide from './PostLeftSide';
import convertCommentCount from '../../lib/convertCommentCount';


function checkClasses(classes) {
    const substrings = ['subreddit-link', 'upvote-arrow-box', 'downvote-arrow-box'];
    return substrings.includes(classes);
}

export const CREATE_VOTE = gql`
    mutation CREATE_VOTE($post_id: ID!, $vflag: String!) {
        createPostVote(data: {
            post: {
                connect: {
                    id: $post_id,
                }
            },
            vflag: $vflag
        }) {
            id
            post {
                title
            }
        }
    }
`;

export const DELETE_VOTE = gql`
    mutation DELETE_VOTE($id: ID!) {
        deletePostVote(id: $id) {
            id
        }
    }
`;

export const UPDATE_VOTE = gql`
    mutation UPDATE_VOTE($id: ID!, $vflag: String!) {
        updatePostVote(id: $id, data: {
            vflag: $vflag
        }) {
            id
        }
    }
`;

function PostMain(props) {


    return (
        <section className="reddit-post" onClick={(e) => {if(!checkClasses(e.target.className)) {
           window.location.href=`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`
        } /**/}}>
        <section className="reddit-post-left">
            <PostLeftSide post={props.post} />
        </section>
        <section className="reddit-post-right">
            <section className="reddit-post-right-top">
                <Link href={`/r/${props?.post?.subreddit?.slug}`}>
                    <a><b className="subreddit-link">r/{props?.post?.subreddit?.name}</b></a>
                </Link>
                <span>&nbsp;•&nbsp;</span>
                <span>Posted by&nbsp;
                    <Link href={`/user/${props?.post?.user?.username}`}>
                    <a  className="subreddit-link">u/{props?.post?.user?.username}</a>
                </Link>
                </span>
                &nbsp;
                <span>Posted {convertDateFromNow(props?.post?.createdAt)}</span>
            </section>
            <section className="reddit-post-right-bottom">
                {
                    props?.post?.link === '' ? <TextPost post={props?.post} />: <MediaPost post={props?.post} />
                 }
            </section>
            <section className="reddit-post-right-bottom-footer"> 
                <a className="subreddit-link" href={`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}>{convertCommentCount(props?.post?.comments?.length || 0)} Comments</a>
                <span className="post-edit-link"><a href={`/user/post/${props?.post?.id}/edit`}>Edit</a></span>
            </section>

        </section>

    </section>
    );
}

PostMain.propType = {
    post: PropTypes.object.isRequired
}

export default PostMain;