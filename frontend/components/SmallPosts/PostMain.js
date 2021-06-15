import React from 'react';
import PropTypes from 'prop-types';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import Link from 'next/link';
import convertDateFromNow from '../../lib/convertDateFromNow'; 
import MediaPost from './MediaPost';
import TextPost from './TextPost';

function PostMain(props) {
    console.log(props);
    
    return (
        <section className="reddit-post" onClick={(e) => {if(e.target.className !== 'subreddit-link') {
            window.location.href=`/r/`
        } /**/}}>
        <section className="reddit-post-left">
         {/*upvote, downvote and current score*/}
         <FaLongArrowAltUp />
         <br />
         <span></span>
         <br />
         <FaLongArrowAltDown />
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