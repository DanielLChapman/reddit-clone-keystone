import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import convertDateFromNow from '../../../lib/convertDateFromNow';
import { totalPostsVotes } from '../../../lib/postSorting';
import PostLeftSide from '../../SmallPosts/PostLeftSide';
import { CURRENT_USER_QUERY } from '../../User';
import CommentsMedia from './CommentsMedia';


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



    return (
        <section className="reddit-post">
         <section className="reddit-post-left">
            <PostLeftSide post={props.post} />
         </section>
         <section className="reddit-post-right">
             <section className="reddit-post-right-top">
                 <span>Posted by&nbsp;
                     <Link href={`/user/${props?.post?.user?.name}`}>
                     <a  className="subreddit-link">u/{props?.post?.user?.name}</a>
                 </Link>
                 </span>
                 &nbsp;
                 <span>Posted {convertDateFromNow(props?.post?.createdAt)}</span>
             </section>
             <section className="reddit-post-right-bottom">
                <h6>{props.post.title}</h6>
                <p>
                    {
                        props.post.link === '' ? <ReactMarkdown>{props.post.content }</ReactMarkdown>: <CommentsMedia post={props.post} user={props.user} />
                    }
                </p>
             </section>
             <section className="reddit-post-right-bottom-footer">
                 <a className="subreddit-link" href={`/r/${props?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}> Comments</a>
             </section>
 
         </section>
 
     </section>
     
    );
}

export default CommentsInfo;