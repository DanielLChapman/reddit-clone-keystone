import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import Router from 'next/router';
import Form from './styles/SubredditForm';
import { useState } from 'react';

//get subreddit info

//able to change owner needs to be added
/*
const EDIT_SUBREDDIT_MUTATION = gql`
    mutation CREATE_SUBREDDIT_MUTATION(
        $name: String!,
        $slug: String!,
        $description: String,
        $sidebar: String,
        $title: String!
    ) {
        
    }
`;*/

function SubredditEdit(props) {
    const [isChecked, setIsChecked] = useState(props.subreddit.status === 'PUBLIC' ? true : false);

    const { inputs, handleChange, resetForm } = useForm({
        name: props.subreddit.name,//shouldn't be able to be changed so set as data from query
        slug: props.subreddit.slug,//shouldn't be able to be changed so set as data from query
        description: props.subreddit.description,
        sidebar: props.subreddit.sidebar,
        title: props.subreddit.title,
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
                    <label htmlFor="status" className="form-checkbox">
                        Status: {isChecked ? 'Public' : 'Private'}<br />
                        <input
                            name="status"
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {setIsChecked(!isChecked) }} />
                    </label>
                    <button type="submit">Edit {/* subreddit name */}</button>
                    
                </fieldset>

            </Form>
        </div>
    );
}

export default SubredditEdit;