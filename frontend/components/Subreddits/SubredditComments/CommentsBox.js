import React, { useState } from 'react';
import useForm from '../../../lib/useForm';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const SUBMIT_POST_WITH_PARENT_MUTATION = gql`
    mutation SUBMIT_POST_WITH_PARENT_MUTATION(
        $post_id: ID!,
        $content: String!,
        $parent: ID!,
    ) {
        createComment(
            data: {
                content: $content,
                post: {
                    connect: {
                        id: $post_id,
                    }
                },
                parent: {
                    connect: {
                        id: $parent
                    }
                }
            }
        ) {
            id
            content
        }
    }
`;

const SUBMIT_POST_WITHOUT_PARENT_MUTATION = gql`
    mutation SUBMIT_POST_WITHOUT_PARENT_MUTATION(
        $post_id: ID!,
        $content: String!,
    ) {
        createComment(
            data: {
                content: $content,
                post: {
                    connect: {
                        id: $post_id,
                    }
                },
            }
        ) {
            id
            content
        }
    }
`;


function sanitizeString(str){
    return (str.length > 10000) ? str.substr(0, 10000-1) + '&hellip;' : str;
}

function CommentsBox(props) {

    const { inputs, handleChange, resetForm } = useForm({
        content: '',
      });

      const [createComment, {data, error, loading}] = useMutation(SUBMIT_POST_WITHOUT_PARENT_MUTATION);
    
    return (
        <div>
    <form onSubmit={async (e) => {
        e.preventDefault();

        let res;
        if (props.parentid) {
            res = await createComment({
                variables: {
                    content: sanitizeString(inputs.content),
                    post_id: props.post.id,
                    parent: props.parentid || '',
                }
            });
        } else {
            res = await createComment({
                variables: {
                    content: sanitizeString(inputs.content),
                    post_id: props.post.id,
                }
            });

            
        }
        
        console.log(res);

        //add to UI element up one level at top through some prop function
    }}>
        <fieldset>
                <label htmlFor="content">
                    <textarea
                        id="content"
                        name="content"
                        placeholder="What are your thoughts?"
                        value={inputs.content}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {/* Markdown/formatting help */}
                <button type="submit">Submit</button>
                
            </fieldset>



        </form>
    </div>

    );
}

CommentsBox.proptypes = {
    postid: PropTypes.string.isRequired,
}

export default CommentsBox;