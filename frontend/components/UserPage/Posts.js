import React, { useState } from 'react';
import convertDateFromNow from '../../lib/convertDateFromNow';
import LeftSide from './LeftSide';

import Link from 'next/link';
import { totalPostsVotes } from '../../lib/postSorting';
import ReactMarkdown from 'react-markdown';
import CommentsEditBox from '../Subreddits/SubredditComments/CommentsEditBox';
import convertCommentCount from '../../lib/convertCommentCount';


function Posts(props) {
    let post = props.post;

    let user = props.user

    let [edit, setEdit] = useState(false);
    let [deleted, setDeleted] = useState(false);

    function returnFunc(newContent) {
        setEdit(false);
    }
    let style = {display: "block"};
    if (deleted) style = {display: 'none'};

    async function deletePost(id) {
        let b = confirm('Are you sure?');
        if (b) {
            let a = await props.deleteFunction({
                variables: {
                    id: id
                }
            });
            if (a?.data?.deletePost?.id) {
                setDeleted(true);
            }
        }
        
    }

    return (
        <section style={style} className=" user-page-posts" >
            <section className="user-reddit-post">
                <section className="reddit-post-left">
                    <LeftSide upvoted={false} downvoted={false} user={props.user} />
                </section>
                <section className="reddit-post-right reddit-post-userpage-right">
                    <section className="reddit-post-right-thumbnail">
                        <img src="https://via.placeholder.com/40" />
                    </section>
                    <section className="reddit-post-right-main">
                        <section className="reddit-post-right-top">
                            <a href={`/r/${post?.subreddit.slug}/comments/${post?.id}/${post?.post_slug}`}>
                                <h3 style={{fontWeight: '600', fontSize: '16px'}}>{post?.title}</h3>
                            </a>
                        </section>
                        <section className="reddit-post-right-middle">
                            submitted {convertDateFromNow(post?.createdAt)} by <a href={`/user/${props.username}`}>{props.username}</a> to <a href={`/r/${post.subreddit.slug}`}>r/{post.subreddit.name}</a>
                        </section>
                        <section className="reddit-post-right-bottom-footer"> 
                            <span>{totalPostsVotes(post)} Karma </span>
                            
                            <span><a href={`/r/${post?.subreddit?.slug}/comments/${post.id}/${post.post_slug}/`}>{convertCommentCount(post?.comments.length)} Comments</a></span>
                            {
                                user.username === props.username && (<>

                                        {post.link === '' && (
                                            <span><a href={`/user/post/${post?.id}/edit`}>Edit</a></span>
                                        )}
                                        <span onClick={() => {deleteComment(comment.id)}}>Delete</span>

                                    </>

                                )


                            }
                    
                        </section>
                    </section>

                    

                    

                </section>

            </section>

        </section>
    );
    
}

export default Posts;