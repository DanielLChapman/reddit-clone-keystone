import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { totalPostsVotes } from '../../../lib/postSorting';
import { CURRENT_USER_QUERY } from '../../User';

//These give errors on importing from postmain, but not when copy+pasted. Not sure why

const CREATE_VOTE = gql`
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

const DELETE_VOTE = gql`
    mutation DELETE_VOTE($id: ID!) {
        deletePostVote(id: $id) {
            id
        }
    }
`;

const UPDATE_VOTE = gql`
    mutation UPDATE_VOTE($id: ID!, $vflag: String!) {
        updatePostVote(id: $id, data: {
            vflag: $vflag
        }) {
            id
        }
    }
`;

function SubredditTopBar(props) {

    const [post, setPost] = useState({
        total: totalPostsVotes(props.post)
    });

    let upvoted = props.user?.postvotes.some((x) => {
        if (x?.post?.id === props?.post?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } 
    })
    let downvoted = props.user?.postvotes.some((x) => {
        if (x?.post?.id === props?.post?.id) {
            if (x.vflag === 'Downvote') {
                return true
            }
        } 
    });

    const getPostVoteId = () => {
        let id = props.user?.postvotes.find((x) => {
            if (x.post.id === props?.post.id) {
                return x.id;
            }
        });

        return id.id;
    }

    const [createPostVote, { data, error, loading }] = useMutation(CREATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [deletePostVote, { data: data_delete, error: error_delete, loading: loading_delete }] = useMutation(DELETE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [updatePostVote, { data: data_update, error: error_update, loading: loading_update}] = useMutation(UPDATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });



    return (
        <div className="comment-top-bar">
            <section className="comment-arrows">
                <FaLongArrowAltUp className={`upvote-arrow ${upvoted? 'upvoted-arrow' : ''}`}  onClick={async () => {
                if (props.user && props.user.id) {
                    if (!upvoted) {
                        //if its downvoted
                        if (downvoted) {
                            //update 
                            const res = await updatePostVote({
                                variables: {
                                    id: getPostVoteId(),
                                    vflag: 'Upvote'
                                }
                            });
                            setPost({
                                total: post.total + 2
                            })
                            
                            
         
                        } else {
                            const res = await createPostVote({
                                variables: {
                                    post_id: props.post.id,
                                    vflag: 'Upvote'
                                }
                            });
                            setPost({
                                total: post.total + 1
                            })
    
                        }
                        
                    } else {    
                        let id = getPostVoteId();
              
                        const res = await deletePostVote({
                            variables: {
                                id: id
                            }
                        });

                        setPost({
                            total: post.total - 1
                        })
                    }

                }
             }
             
         } />
                <span>{post.total}</span>
                <FaLongArrowAltDown className={`downvote-arrow ${downvoted? 'downvoted-arrow' : ''}`} onClick={async () => {
                if (props.user && props.user.id) {
                    if (!downvoted) {
                        //if its downvoted
                        if (upvoted) {
                            const res = await updatePostVote({
                                variables: {
                                    id: getPostVoteId(),
                                    vflag: 'Downvote'
                                }
                            });        
                            setPost({
                                total: post.total - 2
                            })
                        } else {
                            const res = await createPostVote({
                                variables: {
                                    post_id: props.post.id,
                                    vflag: 'Downvote'
                                }
                            });
                            setPost({
                                total:post.total - 1
                            })
    
                      
                        }
                        
                    } else {    
                        let id = getPostVoteId();
    
                        const res = await deletePostVote({
                            variables: {
                                id: id
                            }
                        });

                        setPost({
                            total: post.total + 1
                        })
      

                    }

                }
             }
             
         }  />
            </section>
            <section className="post-title">
                {props.post?.title.substr(0, 20) }
                {props.post?.title.length > 20 ? '...' : ''}
            </section>
            <section className="post-close">
                <a href={`/r/${props.subreddit.slug}`}>
                    <a>&times; Close</a>
                </a>
            </section>
        </div>
    ); 
}

export default SubredditTopBar;