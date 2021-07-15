import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import Form from '../styles/SubredditSubmitForm';


const SUBREDDIT_TEXT_POST_MUTATION = gql`
    mutation SUBREDDIT_TEXT_POST_MUTATION($title: String!, $content: String,  $subreddit_id: ID!, $type: String!, $link: String ) {
        createVariedPost(
            title: $title,
            content: $content,
            subreddit_id: $subreddit_id,
            type: $type,
            link: $link,
        ) {
            id
            content
            post_slug
            title
        }
    }
`;

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return (str.length > 300) ? str.substr(0, 300-1) + '&hellip;' : str;
}

function SubredditPostForm(props) {
    const { inputs, handleChange, resetForm } = useForm({
        content: '',
        title: '',
      });

    const [createVariedPost, { data, error, loading}] = useMutation(
        SUBREDDIT_TEXT_POST_MUTATION
    );

    return (
        <div>
            {error}
        <Form onSubmit={async (e) => {
            e.preventDefault();

            const res = await createVariedPost({
                variables: {
                    title: sanitizeString(inputs.title),
                    content: inputs.content,
                    subreddit_id: props.id,
                    link: '',
                    type: 'text'
                }
            });

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