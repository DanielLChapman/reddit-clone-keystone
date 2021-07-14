import React from 'react';
import CommentsInfo from './CommentsInfo';

function CommentsPage(props) {
    return (
        <section className="comment-page-container">
            <CommentsInfo user={props.user} post={props.post} subreddit={props.subreddit} />
        </section>
    );
}

export default CommentsPage;