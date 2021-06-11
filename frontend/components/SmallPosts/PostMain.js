import React from 'react';
import PropTypes from 'prop-types';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import Link from 'next/link';
import {convertDateFromNow} from '../../lib/convertDateFromNow';

function PostMain(props) {
    console.log(props);
    return (
        <section className="reddit-post" onClick={() => {window.location.href=`/r/`}}>
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
                <Link href={`../r/`}>
                    <a><b>r/kjnjknnk</b></a>
                </Link>
                <span>&nbsp;•&nbsp;</span>
                <span>Posted by&nbsp;
                    <Link href={`../u/`}>
                    <a>u/sadsdasdasdas</a>
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