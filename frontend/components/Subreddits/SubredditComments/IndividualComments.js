import Link from 'next/link';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import convertDateFromNow from '../../../lib/convertDateFromNow';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { CURRENT_USER_QUERY, useUser } from '../../User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { sortingComments, totalPostsVotes } from '../../../lib/postSorting';
import CommentsBox from './CommentsSubmitBox';



function IndividualComments(props) {
    const user = useUser();
    let [total, setTotal] = useState({
        total: totalPostsVotes(props.comment.commentObject)
    });
    let [userComments, setUserComments] = useState({
        comments: []
    })

    let [reply, openReply] = useState(false);

    let upvoted = user?.commentvotes?.some((x) => {
        if (x.comment.id === props?.comment?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } 
    });

    let downvoted = user?.commentvotes?.some((x) => {
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
        let id = user?.commentvotes.find((x) => {
            if (x.comment.id === props?.comment.id) {
                return x.id;
            }
        });


        return id.id;
    }

    const addToParent = (res) => {
        let x = props.tree.createNode(res.content, res.parent.id, res.id, res);
        setUserComments(
           {
               comments: [x, ...userComments.comments]
           }
        )
    }

    let descendents = sortingComments( props.comment.descendents, 'Best');
    
    return (
        <div className="comments-threadline-container">

            <div className="threadline">
                
            </div>

            <div className={`comments-indent comments-indent-${props.count}`}> 
            
                <section className='comment-top'>
                    <span>Posted by&nbsp;
                        <Link href={`/user/${props?.comment?.commentObject.user.username}`}>
                            <a  className="subreddit-link">u/{props?.comment?.commentObject.user?.username}</a>
                        </Link>
                    </span> &nbsp;· &nbsp;
                    <span>{convertDateFromNow(props?.comment.commentObject.createdAt)}</span> {/* future: edited or not */} {/* Flair */}
                </section>
                <section className="comment-content">
                    <ReactMarkdown>{props.comment.content}
                    </ReactMarkdown>
                </section>
                <section className="comment-bottom">
                    <section className="comment-arrows">
                        <FaLongArrowAltUp className={`upvote-arrow ${upvoted? 'upvoted-arrow' : ''}`}  onClick={async () => {
                        if (user && user.id) {
                            if (!upvoted) {
                                //if its downvoted
                                if (downvoted) {
                                    //update 
                                    const res = await props.updatePostVote({
                                        variables: {
                                            id: getPostVoteId(),
                                            vflag: 'Upvote'
                                        }
                                    });
                                    setTotal({
                                        total: total.total + 2
                                    })
                                    
                                    
                
                                } else {
                                    const res = await props.createPostVote({
                                        variables: {
                                            post_id: props.comment.id,
                                            vflag: 'Upvote'
                                        }
                                    });
                                    setTotal({
                                        total: total.total + 1
                                    })
            
                                }
                                
                            } else {    
                                let id = getPostVoteId();
                    
                                const res = await props.deletePostVote({
                                    variables: {
                                        id: id
                                    }
                                });

                                setTotal({
                                    total: total.total - 1
                                })
                            }

                        }
                    }
                    
                } />
                        <span className="total">{total.total}</span>
                        <FaLongArrowAltDown className={`downvote-arrow ${downvoted? 'downvoted-arrow' : ''}`} onClick={async () => {

                        if (user && user.id) {
                            if (!downvoted) {
                                //if its downvoted
                                if (upvoted) {
                                    const res = await props.updatePostVote({
                                        variables: {
                                            id: getPostVoteId(),
                                            vflag: 'Downvote'
                                        }
                                    });        
                                    setTotal({
                                        total: total.total - 2
                                    })
                                } else {
                                    const res = await props.createPostVote({
                                        variables: {
                                            post_id: props.comment.id,
                                            vflag: 'Downvote'
                                        }
                                    });
                                    setTotal({
                                        total:total.total - 1
                                    })
            
                            
                                }
                                
                            } else {    
                                let id = getPostVoteId();
            
                                const res = await props.deletePostVote({
                                    variables: {
                                        id: id
                                    }
                                });

                                setTotal({
                                    total: total.total + 1
                                })
            

                            }

                        }
                    }
                    
                }  />
                </section>
                <span onClick={() => {
                    openReply(!reply)
                }}>Reply</span> {/* Share */}
                </section>
                {
                    reply && (
                        
                        <div className="comments-threadline-container">

                            <div className="threadline">
                                
                            </div>
                            <section className={`comments-indent comment-indent-reply comments-indent-${props.count}` }>
                                <CommentsBox postid={props.post.id} parentid={props.comment.id} returnFunction={addToParent}/>
                            </section>
                        </div>
                        
                    )
                }
                
                <section className="comment-children">
                    {
                        userComments.comments.map((x, i) => {
                            //need to sort descenents first
                            return <IndividualComments tree={props.tree} comment={x} post={props.post} count={props.count + 1} key={x.id}
                            createPostVote={props.createPostVote} deletePostVote={props.deletePostVote} updatePostVote={props.updatePostVote} 
                             />
                        })
                    }
                    {descendents.map((x, i) => {
                        //need to sort descenents first
                        return <IndividualComments tree={props.tree} comment={x} post={props.post} count={props.count + 1} key={x.id}
                        createPostVote={props.createPostVote} deletePostVote={props.deletePostVote} updatePostVote={props.updatePostVote} 
                         />
                    })}
                </section>
                
            </div>
    
        </div>

        );
}

export default IndividualComments;