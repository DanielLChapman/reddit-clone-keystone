import React from 'react';
import { useUser } from '../../User';
import CommentsContainer from './CommentsContainer';
import CommentsInfo from './CommentsInfo';

function CommentsPage(props) {
    return (
        <section className="comment-page-container">
            <section className="comment-page-left">
                <CommentsInfo user={props.user} post={props.post} subreddit={props.subreddit} />
                <CommentsContainer post={props.post} />
               
            </section>
            <section className="comment-page-right">

            </section>
            
        </section>
    );
}

export default CommentsPage;