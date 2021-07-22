import React from 'react';
import Tree from '../../../lib/commentTree';

function CommentsDisplay(props) {
    const tree = new Tree;
    let currentNode = null;

    console.log(tree);

    console.log(tree.contains(550, tree.traverseBF));

    tree.addNew(
        'jkdsfnsjkdfns nsdfk nsdfjk s f',
        550,
        3423432,
        {}
    );

    console.log(tree);
    
    return (
        <div>
            hi
        </div>
    );
}

export default CommentsDisplay;