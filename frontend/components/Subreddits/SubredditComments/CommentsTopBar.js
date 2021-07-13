import Link from 'next/link';
import React from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

function SubredditTopBar(props) {

    let upvoted = props.user?.postvotes.some((x) => {
        /*if (x.post.id === props?.post?.id) {
            if (x.vflag === 'Upvote') {
                return true
            }
        } */
    })
    let downvoted = props.user?.postvotes.some((x) => {
        /*if (x.post.id === props?.post?.id) {
            if (x.vflag === 'Downvote') {
                return true
            }
        } */
    })


    return (
        <div className="comment-top-bar">
            <section className="comment-arrows">
                <FaLongArrowAltUp className={`upvote-arrow`}   />
                <span>0</span>
                <FaLongArrowAltDown className={`downvote-arrow`}   />
            </section>
            <section className="post-title">
                {props.post?.title.substr(0, 20) }
                {props.post?.title.length > 20 ? '...' : ''}
            </section>
            <section className="post-close">
                <Link href={`/r/${props.subreddit.slug}`}>
                    <a>&times; Close</a>
                </Link>
            </section>
        </div>
    ); 
}

export default SubredditTopBar;