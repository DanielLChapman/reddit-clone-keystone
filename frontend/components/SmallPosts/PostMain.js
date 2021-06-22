import React from 'react';
import PropTypes from 'prop-types';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import Link from 'next/link';
import convertDateFromNow from '../../lib/convertDateFromNow'; 
import MediaPost from './MediaPost';
import TextPost from './TextPost';

function checkClasses(classes) {
    const substrings = ['subreddit-link', 'upvote-arrow-box', 'downvote-arrow-box'];
    return substrings.includes(classes);
}

function PostMain(props) {

    return (
        <section className="reddit-post" onClick={(e) => {if(!checkClasses(e.target.className)) {
           window.location.href=`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`
        } /**/}}>
        <section className="reddit-post-left">
         {/*upvote, downvote and current score*/}
         <FaLongArrowAltUp className="upvote-arrow" />
         <div className="upvote-arrow-box"></div>
         <br />
         <span></span>
         <br />
         <FaLongArrowAltDown className="upvote-arrow" />
         <div className="downvote-arrow-box"></div>
         
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
                    props?.post?.link === '' ? <TextPost post={props?.post} />: <MediaPost post={props?.post} />
                 }
            </section>
            <section className="reddit-post-right-bottom-footer">
                <a className="subreddit-link" href={`/r/${props?.post?.subreddit.slug}/comments/${props?.post?.id}/${props?.post?.post_slug}`}> Comments</a>
            </section>

        </section>

    </section>
    );
}

PostMain.propType = {
    post: PropTypes.object.isRequired
}

export default PostMain;