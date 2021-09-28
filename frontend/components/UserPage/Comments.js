import React, { useState } from 'react';
import convertDateFromNow from '../../lib/convertDateFromNow';
import LeftSide from './LeftSide';

import Link from 'next/link';
import { totalPostsVotes } from '../../lib/postSorting';
import ReactMarkdown from 'react-markdown';
import CommentsEditBox from '../Subreddits/SubredditComments/CommentsEditBox';


function Comments(props) {
    let comment = props.comment;
    let post = props.comment.post;
    let user = props.user

    let [edit, setEdit] = useState(false);
    let [content, setContent] = useState(comment.content);
    let [deleted, setDeleted] = useState(false);

    function returnFunc(newContent) {
        setEdit(false);
        setContent(newContent)
    }
    let style = {display: "block"};
    if (deleted) style = {display: 'none'};

    async function deleteComment(id) {
        let b = confirm('Are you sure?');
        if (b) {
            let a = await props.deleteFunction({
                variables: {
                    id: id
                }
            });
            if (a?.data?.deleteComment?.id) {
                setDeleted(true);
            }
        }
        
    }


    /*onClick={(e) => {if(!checkClasses(e.target.className)) {
        window.location.href=`/r/${post?.subreddit.slug}/comments/${post?.id}/${post?.post_slug}/${comment.id}`
    } }}*/
    return (
        <section style={style} className=" user-page-comments" >
            <section className="user-post-top">
                <a href={`/r/${post?.subreddit.slug}/comments/${post?.id}/${post?.post_slug}`}>
                    {post?.title}
                </a>
                <span>&nbsp;&nbsp;by&nbsp;</span>
          
                    <a href={`/user/${post.user.username}`} className="user-page-user-link">{post.user.username}</a>
      
                <span>&nbsp;in&nbsp;</span>
                <a href={`/r/${post?.subreddit.slug}`}>
                    {post?.subreddit.name}
                </a>
            </section>
            <section className="user-reddit-post">
                <section className="reddit-post-left">
                    <LeftSide upvoted={false} downvoted={false} user={props.user} />
                </section>
                <section className="reddit-post-right">
                    <section className="reddit-post-right-top">
         
                            <a href={`/user/${props.username}`} className="user-page-user-link">
                                {props.username}
                            </a>
               
                        &nbsp;&nbsp;<b>{totalPostsVotes(comment)} points</b>
                        &nbsp;&nbsp;<span style={{color: 'grey'}}>{convertDateFromNow(comment.createdAt)}</span>
                        {
                            /*
                            
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
                        */
                        }
                        
                    </section>
                    {
                        !edit && (
                            <section className="reddit-post-right-bottom">
                                <ReactMarkdown>
                                    {content}
                                </ReactMarkdown>
                            </section>
                        )
                    }
                    {
                        edit && (
                            <CommentsEditBox commentid={comment.id} content={content} returnFunc={returnFunc} user={user} />
                        )
                    }
                    

                    <section className="reddit-post-right-bottom-footer"> 
                        <span><a href={`/r/${post?.subreddit?.slug}/comments/${post.id}/${post.post_slug}/${comment.id}`}>Permalink</a></span>
                        <span><a href={`/r/${post?.subreddit?.slug}/comments/${post.id}/${post.post_slug}/${comment?.parent?.id ? comment.parent.id : comment.id}`}> Context</a></span>
                        <span><a href={`/r/${post?.subreddit?.slug}/comments/${post.id}/${post.post_slug}/`}> Full Comments</a></span>
                        {
                            user.username === props.username && (<>

                                    <span onClick={() => {setEdit(!edit)}}> Edit</span>

                                    <span onClick={() => {deleteComment(comment.id)}}> Delete</span>

                                </>

                            )


                        }
                    {/* 
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
                        */}
                    </section>

                </section>

            </section>

        </section>
    );
    
}

export default Comments;