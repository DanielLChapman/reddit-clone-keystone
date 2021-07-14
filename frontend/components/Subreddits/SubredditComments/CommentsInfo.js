import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import convertDateFromNow from '../../../lib/convertDateFromNow';
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


function CommentsInfo(props) {
    const [post, setPost] = useState({
        total: totalPostsVotes(props.post)
    });

    let upvoted = props.user?.postvotes.some((x) => {
        if (x.post.id === props?.post?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } 
    })
    let downvoted = props.user?.postvotes.some((x) => {
        if (x.post.id === props?.post?.id) {
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
        <section className="reddit-post">
         <section className="reddit-post-left">
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
              
          }></div>
          
         </section>
         <section className="reddit-post-right">
             <section className="reddit-post-right-top">
                 <Link href={`/r/${props?.post?.subreddit?.slug}`}>
                     <a><b className="subreddit-link">r/{props?.post?.subreddit?.name}</b></a>
                 </Link>
                 <span>&nbsp;•&nbsp;</span>
                 <span>Posted by&nbsp;
                     <Link href={`/user/${props?.post?.user?.name}`}>
                     <a  className="subreddit-link">u/{props?.post?.user?.name}</a>
                 </Link>
                 </span>
                 &nbsp;
                 <span>Posted {convertDateFromNow(props?.post?.createdAt)}</span>
             </section>
             <section className="reddit-post-right-bottom">
                 {
                     /*props?.post?.link === '' ? <TextPost post={props?.post} />: <MediaPost post={props?.post} />*/
                  }
             </section>
             <section className="reddit-post-right-bottom-footer">
                 <a className="subreddit-link" href={`/r/${props?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}> Comments</a>
             </section>
 
         </section>
 
     </section>
     
    );
}

export default CommentsInfo;