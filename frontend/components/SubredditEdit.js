import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import Router from 'next/router';
import Form from './styles/SubredditForm';

//get subreddit info

//able to change owner needs to be added
const EDITSUBREDDIT_MUTATION = gql`
    mutation CREATE_SUBREDDIT_MUTATION(
        $name: String!,
        $slug: String!,
        $description: String,
        $sidebar: String,
        $title: String!
    ) {
        
    }
`;

function SubredditEdit(props) {
    const { inputs, handleChange, resetForm } = useForm({
        name: '',//shouldn't be able to be changed so set as data from query
        slug: '',//shouldn't be able to be changed so set as data from query
        description: '',
        sidebar: '',
        title: '',
        errors: {
            name: 'false'
        }
      });

      //const [createSubreddit, {loading, data, error}] = useMutation(CREATE_SUBREDDIT_MUTATION);


    
    return (
        <div>
            <Form
            onSubmit={async (e) => {
                e.preventDefault();
                //form validation

                /*const res = await createSubreddit({
                    variables: {
                        name: inputs.name,
                        description: inputs.description,
                        sidebar: inputs.sidebar,
                        title: inputs.title,
                        slug: inputs.name.toLowerCase()
                    }
                })*/

                Router.push({
                    pathname: `/r/${inputs.name.toLowerCase()}`,
                  });

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
                    <label htmlFor="description">
                        Description <br />
                        <textarea
                            id="description"
                            name="description"
                            placeholder="description"
                            value={inputs.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="sidebar">
                        Sidebar <br />
                        <textarea
                            id="sidebar"
                            name="sidebar"
                            placeholder="sidebar"
                            value={inputs.sidebar}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Edit {/* subreddit name */}</button>
                    
                </fieldset>

            </Form>
        </div>
    );
}

export default SubredditEdit;