import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../../lib/useForm';
import Error from '../Error';
import Form from '../styles/SubredditSubmitForm';
//refetch queries
//import { id_array  } from '../../lib/allSubreddits';


export const SUBREDDIT_MEDIA_POST_MUTATION = gql`
    mutation SUBREDDIT_MEDIA_POST_MUTATION($title: String!, $content: String,  $subreddit_id: ID!, $type: String!, $link: String ) {
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

function SubredditMediaForm(props) {
    const { inputs, handleChange, resetForm } = useForm({
        title: '',
        link: ''
      });

    const [createVariedPost, { data, error, loading}] = useMutation(
        SUBREDDIT_MEDIA_POST_MUTATION
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

            let typeInput = 'media';
            if (inputs.link.includes('vimeo')) {
                typeInput = 'vimeo';
            } else if (inputs.link.includes('youtube')) {
                typeInput = 'youtube';
            } else {
                typeInput = 'image'
            }
            //NEED TO CREATE A POSTVOTE
            const res = await createVariedPost({
                variables: {
                    title: sanitizeString(inputs.title),
                    subreddit_id: props.id,
                    content: '',
                    link: inputs.link,
                    type: typeInput,
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
                    <label htmlFor="link">
                        Link <br />
                        <input 
                            required
                            type="text"
                            id="link"
                            name="link"
                            value={inputs.link}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Create Link/Media Post</button>
                    
                </fieldset>



        </Form>
        </div>

    );
}

export default SubredditMediaForm;