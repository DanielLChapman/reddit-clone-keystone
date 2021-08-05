import React, { useState } from 'react';
import Tree from '../../../lib/commentTree';
import { useUser } from '../../User';
import CommentsContainer from './CommentsContainer';
import CommentsDisplay from './CommentsDisplay';
import CommentsInfo from './CommentsPageMainBox';

function CommentsPage(props) {
    let [userComments, setUserComments] = useState({
        comments: []
    })

    const addToParent = (res) => {
        const tree = new Tree;
        let x = tree.createNode(res.content, 1, res.id, res);
        console.log(x);
        setUserComments(
           {
               comments: [x, ...userComments.comments]
           }
        )
    }
    return (
        <section className="comment-page-container">
            <section className="comment-page-left">
                <CommentsInfo user={props.user} post={props.post} subreddit={props.subreddit} />
                <CommentsContainer post={props.post} returnFunction={addToParent} />
                {/* pre-sort comments so that we can have posts appear in the correct spot, somehow to be determined */}
                <CommentsDisplay post={props.post} sortedComments={null} userComments={userComments}/>
            </section>
            <section className="comment-page-right">

            </section>
            
        </section>
    );
}

export default CommentsPage;