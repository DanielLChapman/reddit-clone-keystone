import React from 'react';
import CommentsInfo from './CommentsInfo';

function CommentsPage(props) {
    return (
        <section className="comment-page-container">
            <section className="comment-page-left">
                <CommentsInfo user={props.user} post={props.post} subreddit={props.subreddit} />
            </section>
            <section className="comment-page-right">
                
            </section>
            
        </section>
    );
}

export default CommentsPage;