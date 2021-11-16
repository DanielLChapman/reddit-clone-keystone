import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import Error from '../Error';
import Form from '../styles/SubredditSubmitForm';


const CREATE_VOTE = gql`
    mutation CREATE_VOTE($post_id: ID!, $vflag: String!) {
        createPostVote(data: {
            post: {
                connect: {
                    id: $post_id,
                }
            },
            vflag: $vflag
        }) {
            id
            vflag
        }
    }
`;


export const SUBREDDIT_TEXT_POST_MUTATION = gql`
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
            {error && (
                <Error error={error} />
            )}
            {data && (
                <span>Success. <a href={`/r/${props.subreddit_slug}/comments/${data.createVariedPost.id}/${data.createVariedPost.post_slug}`}>Click here to view your new post!</a></span>
            )}
        <Form onSubmit={async (e) => {
            e.preventDefault();


            //NEED TO CREATE A POSTVOTE
            const res = await createVariedPost({
                variables: {
                    title: sanitizeString(inputs.title),
                    content: inputs.content,
                    subreddit_id: props.id,
                    link: '',
                    type: 'text'
                }
            });
            
            /* Moved to back end!! 
            const voteres = await createPostVote({
                variables: {
                    post_id: res.createVariedPost.id,
                    vflag: 'Upvote'
                }
            });

            */
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