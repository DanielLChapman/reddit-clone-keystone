import React, { useState } from 'react';
import useForm from '../../../lib/useForm';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../User';


const UPDATE_COMMENT = gql`
    mutation UPDATE_COMMENT($id: ID!, $content: String!) {
        updateComment(id: $id, data: {
            content: $content
        }) {
            id
            content
        }
    }
`;



function sanitizeString(str){
    return (str.length > 10000) ? str.substr(0, 10000-1) + '&hellip;' : str;
}

function CommentsEditBox(props) {

    const { inputs, handleChange, resetForm } = useForm({
        content: props.content || '',
      });

      const [updateComment, {data, error, loading}] = useMutation(UPDATE_COMMENT);

    return (
        <div>
            {
                error && (
                    <span>Error: {error}</span>
                )
            }
    <form onSubmit={async (e) => {
        e.preventDefault();

        let res;

        res = await updateComment({
            variables: {
                id: props.commentid,
                content: sanitizeString(inputs.content)
            }
        });

        if (res.data.updateComment) {
            props.returnFunc(res.data.updateComment.content)
        }


    
        //add to UI element up one level at top through some prop function
    }}>
        <fieldset>
                <label htmlFor="content" className="inline-edit-box-comments" data-testid="edit-comments-box">
                    <textarea
                        className="content"
                        name="content"

                        placeholder="What are your thoughts?"
                        value={inputs.content}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {/* Markdown/formatting help */}
                <button type="submit" className="comment-box-submit">Submit</button>
                
            </fieldset>



        </form>
    </div>

    );
}

CommentsEditBox.proptypes = {
    commentid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    returnFunc: PropTypes.func,
    user: PropTypes.object.isRequired,
}

export default CommentsEditBox;