import React, { useState } from 'react';
import { CURRENT_USER_QUERY, useUser } from '../User';
import getPostVoteId from '../../lib/getPostId';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { totalPostsVotes } from '../../lib/postSorting';


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

function PostLeftSide(props) {
    const user = useUser();
    const [post, setPost] = useState({
        total: props?.post?.total || totalPostsVotes(props.post)
    });

    let upvoted = user?.postvotes.some((x) => {
        if (x.post.id === props?.post?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } 
    });

    let downvoted = user?.postvotes.some((x) => {
        if (x.post.id === props?.post?.id) {
            if (x.vflag === 'Downvote') {
                return true
            }
        } 
    });

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
        <>
         {/*upvote, downvote and current score*/}
         <FaLongArrowAltUp className={`upvote-arrow ${upvoted? 'upvote-arrow-colored' : ''}`}   />
         <div className="upvote-arrow-box" aria-disabled={loading || loading_delete} onClick={async () => {
                if (user) {
                    if (!upvoted) {
                        //if its downvoted
                        if (downvoted) {
                            //update 
                            const res = await updatePostVote({
                                variables: {
                                    id:  getPostVoteId(user, props.post.id),
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
                        let id = getPostVoteId(user, props.post.id);
              
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
             
         }></div>
         <br />
         <span >{post.total}</span>
         <br />
         <FaLongArrowAltDown className={`upvote-arrow ${downvoted ? 'downvote-arrow-colored' : ''}`} />
         <div className="downvote-arrow-box" aria-disabled={loading || loading_delete} onClick={async () => {
                if (user) {
                    if (!downvoted) {
                        //if its downvoted
                        if (upvoted) {
                            const res = await updatePostVote({
                                variables: {
                                    id:  getPostVoteId(user, props.post.id),
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
                        let id =  getPostVoteId(user, props.post.id);
    
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
             
         }></div>
         
        </>
    );
}

PostLeftSide.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostLeftSide;