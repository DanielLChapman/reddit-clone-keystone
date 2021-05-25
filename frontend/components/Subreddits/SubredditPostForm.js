import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import Form from '../styles/SubredditSubmitForm';


const SUBREDDIT_TEXT_POST_MUTATION = gql`
    mutation SUBREDDIT_TEXT_POST_MUTATION($title: String!, $content: String,  $subreddit_id: ID! ) {
        createTextPost(
            title: $title,
            content: $content,
            subreddit_id: $subreddit_id
        ) {
            id
            content
            post_slug
            title
        }
    }
`;

function SubredditPostForm(props) {
    const { inputs, handleChange, resetForm } = useForm({
        content: '',
        title: '',
      });

    const [createPost, { data, error, loading}] = useMutation(
        SUBREDDIT_TEXT_POST_MUTATION
    );

    return (
        <div>
        <Form onSubmit={async (e) => {
            e.preventDefault();

            const res = await createPost({
                variables: {
                    title: inputs.title,
                    content: inputs.content,
                    subreddit_id: props.id,

                }
            });

            console.log(res);

            /*

            Router.push({
                pathname: `/r/${inputs.name.toLowerCase()}`,
              });
*/
        }}>
            <fieldset>
                    <label htmlFor="title">
                        Title <br />
                        <input 
                            required
                            type="text"
                            id="title"
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                        />
                    </label>
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
}

export default SubredditPostForm;