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
import getPostVoteId from '../../lib/getPostId';
import convertCommentCount from '../../lib/convertCommentCount';


function checkClasses(classes) {
    const substrings = ['subreddit-link', 'upvote-arrow-box', 'downvote-arrow-box', 'post-edit-link post-delete'];
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

//Deleting posts wont delete other people's votes on that post on their account, but we will delete the users own vote on it.
export const DELETE_POST = gql`
    mutation DELETE_POST($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;


export const REMOVE_POST_MUTATION = gql`
    mutation REMOVE_POST_MUTATION($id: ID!, $removed: String!) {
        updatePost(
            id: $id
            data: {
                removed: $removed
            }) {
            id

        }
    }
`;

function PostMain(props) {
    
    let [removed, updateRemoved] = useState(props?.post?.removed === 'True' || false);
    
    const [deletePost, {data, error, loading}] = useMutation(DELETE_POST);
    const [deletePostVote, {data: datavote, error: errorvote, loading: loadingvote}] = useMutation(DELETE_VOTE);
    const [updatePost, {data:removedata, error:removeerror, loading: removeloading}] = useMutation(REMOVE_POST_MUTATION);

    const deletePostFunc = async () => {
        let a = confirm('Are you sure?');
        
        if (a) {
            //delete the post
            let postvoteid = getPostVoteId(props.user, props.post.id);

            let res = await deletePost({
                variables: {
                    id: props.post.id
                }
            });

            if (res.data.deletePost) {
                //delete the postvote
                //find the postvote id
                let res2 = await deletePostVote({
                    variables: {
                        id: postvoteid
                    }
                });

                if(res2.deletePostVote) {
                    alert('success');
                }
            }

            
            
           

        }
    }
    const removePostFunc = async () => {
        let a = confirm('Are you sure?');
        
        if (a) {
            
            let val = removed;
            let newVal;
            !val ? newVal = 'True' : newVal = 'False'
            //update post
            let res = await updatePost({
                variables: {
                    id: props.post.id,
                    removed: newVal
                }
            });

            if (res.data.updatePost) {
                updateRemoved(!val);
            }
        }
    }

    let style = {
        display: "none"
    };


    return (
        <section style={data ? style : {display: "block"}} className="reddit-post" onClick={(e) => {if(!checkClasses(e.target.className)) {
            window.location.href=`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`
        } /**/}}>
        <section className="reddit-post-left">
            <PostLeftSide post={props.post} user={props.user} />
        </section>
        <section className="reddit-post-right">
            <section className="reddit-post-right-top">
                <a href={`/r/${props?.post?.subreddit?.slug}`}>
                    <a><b className="subreddit-link">r/{props?.post?.subreddit?.name}</b></a>
                </a>
                <span>&nbsp;•&nbsp;</span>
                <span>Posted by&nbsp;
                    <a  href={`/user/${props?.post?.user?.username}`} className="subreddit-link">u/{props?.post?.user?.username}</a>
                </span>
                &nbsp;
                <span>Posted {convertDateFromNow(props?.post?.createdAt)}</span>
            </section>
            <section className="reddit-post-right-bottom">

                {
                    removed ? '[REMOVED]' : 
                    props?.post?.link === '' ? <TextPost post={props?.post} />: <MediaPost post={props?.post} />
                 }
            </section>
            <section className="reddit-post-right-bottom-footer"> 
                <a className="subreddit-link" href={`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}>{convertCommentCount(props?.post?.comments?.length || 0)} Comments</a>
                {
                    props?.post?.user?.username === props?.user?.username && props?.post?.link === '' ? <span className="post-edit-link"><a href={`/user/post/${props?.post?.id}/edit`}>Edit</a></span> : ''
                }
                {
                    props?.post?.user?.username === props?.user?.username && (
                        <span onClick={deletePostFunc} className="post-edit-link post-delete">Delete</span>     
                    )
                }
                
                {
                    props?.ownership && props?.post?.user?.username === props?.user?.username && (
                        <span onClick={removePostFunc} className="post-edit-link post-delete">{removed ? 'Bring Back': 'Remove'}</span>
                    )
                } 
                
            </section>

        </section>

    </section>
    );
}

PostMain.propType = {
    post: PropTypes.object.isRequired
}

export default PostMain;