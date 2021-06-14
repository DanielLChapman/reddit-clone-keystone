import React from 'react';
import PropTypes from 'prop-types';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import Link from 'next/link';
import {convertDateFromNow} from '../../lib/convertDateFromNow';

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
                <span>Posted </span>
            </section>
            <section className="reddit-post-right-bottom">
                
            </section>
            <section className="reddit-post-right-bottom-footer">
  
            </section>

        </section>

    </section>
    );
}

PostMain.propType = {
    post: PropTypes.object.isRequired
}

export default PostMain;