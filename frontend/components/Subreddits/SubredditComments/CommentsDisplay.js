import React from 'react';
import Tree from '../../../lib/commentTree';

function CommentsDisplay(props) {
    const tree = new Tree;
    let currentNode = null;

    tree.addNew(
        'jkdsfnsjkdfns nsdfk nsdfjk s f',
        1,
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