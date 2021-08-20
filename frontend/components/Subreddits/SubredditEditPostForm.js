import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import useForm from '../../lib/useForm';
import Form from '../styles/SubredditForm';
import Link from 'next/link';

const UPDATE_POST_MUTATION = gql`
    mutation UPDATE_POST_MUTATION($id: ID!, $content: String!) {
        updatePost(
            id: $id
            data: {
                content: $content
            }) {
            id

        }
    }
`;

function SubredditEditPostForm(props) {
    const { inputs, handleChange, resetForm } = useForm({
        content: props.post.content || '',
      });


    const [updatePost, { data, error, loading}] = useMutation(
        UPDATE_POST_MUTATION
    );

    if (props.post.link !== '') {
        return <span>Nothing To Edit Here</span>
    }


    return (
        <div className="form-moving">
            {
                error && <span>Error</span>
            }
            {
                data && <span>Success. <Link href={`/r/${props.post.subreddit.slug}/comments/${props.post.id}/${props.post.post_slug}`}>Click here to go back</Link></span>
            }

           <h4 className='form-edit-title'>{props.post.title}</h4>
        <Form aria-disabled={loading} onSubmit={async (e) => {
            e.preventDefault();


            //NEED TO CREATE A POSTVOTE
            const res = await updatePost({
                variables: {
                    content: inputs.content,
                    id: props.post.id
                }
            });
            /*
            const voteres = await createPostVote({
                variables: {
                    post_id: res.createVa,
                    vflag: 'Upvote'
                }
            });*/

            /*

            Router.push({
                pathname: `/r/${inputs.name.toLowerCase()}`,
              });
*/
        }}>
            <fieldset>
                    <label htmlFor="content">
                        Text: <br />
                        <textarea
                            id="content"
                            name="content"
                            placeholder=""
                            value={inputs.content}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Create Text Post</button>
                    
                </fieldset>



        </Form>
        </div>
    );
};

SubredditEditPostForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default SubredditEditPostForm;