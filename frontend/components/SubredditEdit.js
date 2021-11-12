import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import Router from 'next/router';
import Form from './styles/SubredditForm';
import { useState } from 'react';
import {GET_SUBREDDIT_INFO } from '../components/Subreddits/SubredditPage';
import Link from 'next/link';

//get subreddit info

//able to change owner needs to be added

export const EDIT_SUBREDDIT_MUTATION = gql`
    mutation EDIT_SUBREDDIT_MUTATION(
        $name: String!,
        $slug: String!,
        $description: String,
        $sidebar: String,
        $title: String!,
        $id: ID!
    ) {
        updateSubreddit(id: $id, data: {
            name: $name,
            slug: $slug,
            description: $description
            sidebar: $sidebar,
            title: $title
        }) {
            id
        }
    }
`;

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

      const [updateSubreddit, {loading, data, error}] = useMutation(EDIT_SUBREDDIT_MUTATION);

    
    if (error) return <div>Error</div>;
    if (loading) return <span>Loading...</span>
    return (
        <div>
            {
                data && (
                    <section className="success-form-message">
                        Successfully updated. <a href={`/r/${props.subreddit.slug}`}>View now </a>
                    </section>
                )
            }
            
            <Form 
            onSubmit={async (e) => {
                e.preventDefault();
                //form validation

                const res = await updateSubreddit({
                    variables: {
                        id: props.subreddit.id,
                        name: inputs.name,
                        description: inputs.description,
                        sidebar: inputs.sidebar,
                        title: inputs.title,
                        slug: inputs.name.toLowerCase()
                    }
                })


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