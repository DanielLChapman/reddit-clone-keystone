import React from 'react';
import Tree from '../../../lib/commentTree';

function CommentsDisplay(props) {
    const tree = new Tree;
    let currentNode = null;
    
    if (props.post === undefined) return <div>Nothing to see here...</div>
    if (props?.post?.comments.length === 0) return <div>Nothing yet...</div>
    //convert comments to tree
    props.post.comments.forEach((x) => {
        console.log(x);
        tree.addNew(
            x.content,
            x.parent?.id || 1,
            x.id,
            x
        )
    })

    console.log(JSON.stringify(tree));
    return (
        <div>
            hi
        </div>
    );
}

export default CommentsDisplay;