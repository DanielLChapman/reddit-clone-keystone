import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import Tree from '../../../lib/commentTree';
import sortingPosts, { sortingComments } from '../../../lib/postSorting';
import Dropdown from '../../Dropdown';
import { CURRENT_USER_QUERY } from '../../User';
import IndividualComments from './IndividualComments';


const CREATE_VOTE = gql`
    mutation CREATE_VOTE($post_id: ID!, $vflag: String!) {
        createCommentVote(data: {
            comment: {
                connect: {
                    id: $post_id,
                }
            },
            vflag: $vflag
        }) {
            id
            comment {
                id
            }
        }
    }
`;

const DELETE_VOTE = gql`
    mutation DELETE_VOTE($id: ID!) {
        deleteCommentVote(id: $id) {
            id
        }
    }
`;

const UPDATE_VOTE = gql`
    mutation UPDATE_VOTE($id: ID!, $vflag: String!) {
        updateCommentVote(id: $id, data: {
            vflag: $vflag
        }) {
            id
        }
    }
`;


function CommentsDisplay(props) {
    let options = ['Hot', 'Best', 'New', 'Top', 'Rising'];
    const [dropValue, setDropValue] = useState('Hot');
    const tree = new Tree;
    let currentNode = null;
    
    //if props.user.comments, we can skip this
    if (props.post === undefined) return <div>Nothing to see here...</div>
    if (props?.post?.comments.length === 0 && props.userComments.comments.length === 0) return <div>Nothing yet...</div>
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
    queue = sortingComments(queue, dropValue);

    const [createPostVote, { data, error, loading }] = useMutation(CREATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [deletePostVote, { data: data_delete, error: error_delete, loading: loading_delete }] = useMutation(DELETE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const [updatePostVote, { data: data_update, error: error_update, loading: loading_update}] = useMutation(UPDATE_VOTE,{
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    
        

    return (
        <>
        <div className="comment-sorting">
            <span>Sort By <Dropdown returnFunc={setDropValue} selected={dropValue} options={options} />    </span>
        </div>

        <div className="comment-tree-beginning">
            {
                props.userComments.comments.map((x, i) => {
                    return <IndividualComments tree={tree} comment={x} post={props.post} count={1} key={x.id} sortOption={dropValue}
                    createPostVote={props.createPostVote} deletePostVote={props.deletePostVote} updatePostVote={props.updatePostVote} 
                        />
                })
            }
            {queue.map((x, i) => {
                return <IndividualComments tree={tree} comment={x} count={1} post={props.post} key={x.id} createPostVote={createPostVote} deletePostVote={deletePostVote} updatePostVote={updatePostVote} />
            })}
        </div>
        </>
    );
}

export default CommentsDisplay;