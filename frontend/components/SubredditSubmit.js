import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import Router from 'next/router';
import Form from './styles/SubredditForm';


//NEED TO SET OWNER HERE
export const CREATE_SUBREDDIT_MUTATION = gql`
    mutation CREATE_SUBREDDIT_MUTATION(
        $name: String!,
        $slug: String!,
        $description: String,
        $sidebar: String,
        $title: String!
    ) {
        createSubreddit(
            data: {
                name: $name,
                slug: $slug,
                description: $description,
                sidebar: $sidebar,
                title: $title
            }
        ) {
            id
            name
        }
    }
`;


function SubredditSubmitForm(props) {
    const { inputs, handleChange, resetForm } = useForm({
        name: '',
        slug: '',
        description: '',
        sidebar: '',
        title: '',
        errors: {
            name: 'false'
        }
      });

      const [createSubreddit, {loading, data, error}] = useMutation(CREATE_SUBREDDIT_MUTATION);


    
    return (
        <div>
            <Form
            onSubmit={async (e) => {
                e.preventDefault();
                //form validation
                let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if (format.test(inputs.name)) {
                    alert('No spaces or special characters in name field');
                    let target = {
                        target: {
                            value:'true', 
                            name: 'name', 
                            type: 'error'
                        }
                    }
                    handleChange(target);
                    return;
                } 

                const res = await createSubreddit({
                    variables: {
                        name: inputs.name,
                        description: inputs.description,
                        sidebar: inputs.sidebar,
                        title: inputs.title,
                        slug: inputs.name.toLowerCase()
                    }
                })

                Router.push({
                    pathname: `/r/${inputs.name.toLowerCase()}`,
                  });

            }}>
                <fieldset>
                    <label htmlFor="name">
                        Name
                        <br />
                        <span className="lower-form-text">no spaces or special characters.</span>
                        <input 
                            required
                            type="text"
                            id="name"
                            name="name"
                            className={inputs.errors.name === 'true' ? 'error-field' : ''}
                            value={inputs.name}
                            placeholder="name"
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="title">
                        Title <br />
                        <input 
                            required
                            type="text"
                            id="title"
                            name="title"
                            placeholder="title"
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
                    <button type="submit">Create Subreddit</button>
                    
                </fieldset>

            </Form>
        </div>
    );
}

export default SubredditSubmitForm;