import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import convertCommentCount from '../../../lib/convertCommentCount';
import convertDateFromNow from '../../../lib/convertDateFromNow';
import getPostVoteId from '../../../lib/getPostId';
import { totalPostsVotes } from '../../../lib/postSorting';
import PostLeftSide from '../../SmallPosts/PostLeftSide';

import CommentsMedia from './CommentsPageMedia';


//These give errors on importing from postmain, but not when copy+pasted. Not sure why
const COMMENT_COUNT = gql`
    query COMMENT_COUNT($post_id: ID!) {
        _allCommentsMeta(
            where: {
                post: {
                    id: $post_id
                }
            },
        ) {
            count
        }
    }
`;

const DELETE_VOTE = gql`
    mutation DELETE_VOTE($id: ID!) {
        deletePostVote(id: $id) {
            id
        }
    }
`;

const DELETE_POST = gql`
    mutation DELETE_POST($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

const REMOVE_POST_MUTATION = gql`
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

function CommentsInfo(props) {
    let [removed, updateRemoved] = useState(props?.post?.removed === 'True' || false);
    const [updatePost, {data:removedata, error:removeerror, loading: removeloading}] = useMutation(REMOVE_POST_MUTATION);
    const [deletePost, {data:deletedata, error:deleteerror, loading:deleteloading}] = useMutation(DELETE_POST);
    const [deletePostVote, {data: datavote, error: errorvote, loading: loadingvote}] = useMutation(DELETE_VOTE);


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

    const {data, error, loading} = useQuery(COMMENT_COUNT, {
        variables: {
            post_id: props.post.id
        }
    });

    if (error) return <span>Err...</span>
    if (loading) return <div>Loading...</div>

    

    return (
        <section className="reddit-post">
         <section className="reddit-post-left">
            <PostLeftSide post={props.post} />
         </section>
         <section className="reddit-post-right">
             <section className="reddit-post-right-top">
                 <span>Posted by&nbsp;
                     <a href={`/user/${props?.post?.user?.username}`} className="subreddit-link">u/{props?.post?.user?.username}</a>
                 </span>
                 &nbsp;
                 <span>Posted {convertDateFromNow(props?.post?.createdAt)}</span>
             </section>
             <section className="reddit-post-right-bottom">
                <h6>{removed ? props.ownership ? `[REMOVED] ${props.post.title}` : '[REMOVED]' : props.post.title}</h6>
                    {   
                        //if removed
                        removed ?  
                            //check if the user is an owner or moderator of the subreddit
                            props.ownership ? 
                                //if so, show removed and then the actual content
                                    props.post.link === '' ? 
                                        <div style={props.propstyle}><ReactMarkdown >{props.post.content }</ReactMarkdown></div>
                                    : 
                                        <CommentsMedia propstyle={props.propstyle} post={props.post} user={props.user} />
                                
                                : 
                                //else show removed
                                '[REMOVED]' 
                            :
                            //otherwise if its not removed, show the original content
                            props.post.link === '' ? 
                                <div style={props.propstyle}><ReactMarkdown >
                                    {props.post.content }
                                </ReactMarkdown></div>
                            : <CommentsMedia propstyle={props.propstyle} post={props.post} user={props.user} />
                    }
             </section>
             <section className="reddit-post-right-bottom-footer">
                 <a className="subreddit-link" href={`/r/${props?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}>{convertCommentCount(data._allCommentsMeta.count)} Comments</a>
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

export default CommentsInfo;