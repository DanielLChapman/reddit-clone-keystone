import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import convertDateFromNow from '../../../lib/convertDateFromNow';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { CURRENT_USER_QUERY, useUser } from '../../User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CREATE_VOTE = gql`
    mutation CREATE_VOTE($post_id: ID!, $vflag: String!) {
        createCommentVote(data: {
            comment: {
                connect: {
                    id: $post_id,
                }
            },
            vflag: $vflag
        }) {
            id
            comment {
                id
            }
        }
    }
`;

const DELETE_VOTE = gql`
    mutation DELETE_VOTE($id: ID!) {
        deleteCommentVote(id: $id) {
            id
        }
    }
`;

const UPDATE_VOTE = gql`
    mutation UPDATE_VOTE($id: ID!, $vflag: String!) {
        updateCommentVote(id: $id, data: {
            vflag: $vflag
        }) {
            id
        }
    }
`;


function IndividualComments(props) {
    const user = useUser();

    let upvoted = props.user?.commentvotes.some((x) => {
        if (x.comment.id === props?.comment?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } 
    })
    let downvoted = props.user?.commentvotes.some((x) => {
        if (x.comment.id === props?.comment?.id) {
            if (x.vflag === 'Downvote') {
                return true
            }
        } 
    });

    if (props.count > 5) {
        return <Link href="#" className="continue-this-thread"><a>Continue this thread...</a></Link>
    }

    const getPostVoteId = () => {
        let id = props.user?.commentvotes.find((x) => {
            if (x.comment.id === props?.comment.id) {
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
        <div className={`comments-indent comments-indent-${props.count}`}> 
            <section className='comment-top'>
                 <span>Posted by&nbsp;
                     <Link href={`/user/${props?.comment?.commentObject.user.username}`}>
                        <a  className="subreddit-link">u/{props?.comment?.commentObject.user?.username}</a>
                     </Link>
                 </span> &nbsp;
                 <span>{convertDateFromNow(props?.comment.commentObject.createdAt)}</span> {/* future: edited or not */} {/* Flair */}
            </section>
            <section className="comment-content">
                <ReactMarkdown>{props.comment.content}
                </ReactMarkdown>
            </section>
            <section className="comment-bottom">
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
                    <span>Vote</span>
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
             {/* Reply */} {/* Share */}
            </section>
            <section className="comment-children">
                {props.comment.descendents.map((x, i) => {
                    //need to sort descenents first
                    return <IndividualComments comment={x} count={props.count + 1} key={x.id} />
                })}
            </section>
            
        </div>
    );
}

export default IndividualComments;