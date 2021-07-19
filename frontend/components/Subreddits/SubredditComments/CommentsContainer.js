import React from 'react';
import { useUser } from '../../User';
import CommentsBox from './CommentsBox';

function CommentsContainer(props) {
    const user = useUser();
    return (
        <section className="comments-container">
            {
                user && (
                    <>
                        <span>Comment as {user.username}</span>
                        <section className="comments-submission-container">
                            <CommentsBox post={props.post}/>
                        </section>
                    </>
                )
            }
        </section>
    );
}

export default CommentsContainer;