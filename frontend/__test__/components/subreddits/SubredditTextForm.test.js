import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SubredditContent from '../../../components/Subreddits/SubredditContent';
import { fakeSubreddit, fakeTextPost, fakeUser  } from '../../../lib/testUtils';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { GET_POST_INFO } from '../../../components/Subreddits/SubredditCommentsContainer';
//import Signup, { SIGNUP_MUTATION } from '../../components/SignUp';
import { signedInMocksWithPosts, signedInMocks } from '../../helpers/generalMocks';
import { CURRENT_USER_QUERY } from '../../../components/User';
import { SUBREDDIT_TEXT_POST_MUTATION } from '../../../components/Subreddits/SubredditPostForm';

const fakeSubredditObj = fakeSubreddit();
const fakePostObj = fakeTextPost();
const fakeUserObj = fakeUser();



const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: {...fakeUserObj}}}
    },
    {
        request: {
            query: SUBREDDIT_TEXT_POST_MUTATION,
            variables: {
                title:fakePostObj.title,
                content:fakePostObj.content,
                subreddit_id:fakePostObj.subreddit.id,
                link:"",
                type:"text"}
        },
        result: {
            data: {
                createVariedPost: {
                    id: fakePostObj.id,
                    content: fakePostObj.content,
                    post_slug: fakePostObj.post_slug,
                    title: fakePostObj.title,
                }
            }
        }

    }

  ];

describe('It switches subreddit content based on props', () => {
    it ('tries to renders a text form with being logged in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" selftext="true" id={fakePostObj.subreddit.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )
       

        await screen.findByText('Create Text Post'); 

        expect(container).toMatchSnapshot();
    });

    it ('succesfully submits data and gets a desired response', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" selftext="true" id={fakePostObj.subreddit.id}  subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )
       

        await screen.findByText('Create Text Post'); 

        await userEvent.type(screen.getByLabelText('Title'), fakePostObj.title);
        await userEvent.type(screen.getByLabelText('Text:'), fakePostObj.content);
        await userEvent.click(screen.getByText('Create Text Post'));

        await waitFor(() => wait(0));

        await screen.findByText('Success.'); 
    })


})