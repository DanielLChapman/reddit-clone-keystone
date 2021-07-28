import React from 'react';
import Tree from '../../../lib/commentTree';
import IndividualComments from './IndividualComments';

function CommentsDisplay(props) {
    const tree = new Tree;
    let currentNode = null;
    
    if (props.post === undefined) return <div>Nothing to see here...</div>
    if (props?.post?.comments.length === 0) return <div>Nothing yet...</div>
    //convert comments to tree
    props.post.comments.forEach((x) => {
        tree.addNew(
            x.content,
            x.parent?.id || 1,
            x.id,
            x
        )
    })
    let root = tree.root;
    let queue = root.descendents;
    //need to sort by votes on comment

    console.log(queue);
    return (
        <div className="comment-tree-beginning">
            {queue.map((x, i) => {
                return <IndividualComments comment={x} count={1} post={props.post} key={x.id} />
            })}
        </div>
    );
}

export default CommentsDisplay;