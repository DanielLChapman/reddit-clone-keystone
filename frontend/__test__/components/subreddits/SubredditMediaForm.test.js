import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SubredditContent from '../../../components/Subreddits/SubredditContent';
import { CURRENT_USER_QUERY } from '../../../components/User';
import { fakeMediaPost, fakeSubreddit, fakeTextPost, fakeUser  } from '../../../lib/testUtils';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { SUBREDDIT_MEDIA_POST_MUTATION } from '../../../components/Subreddits/SubredditMediaForm';

const fakeSubredditObj = fakeSubreddit();
const fakePostObj = fakeMediaPost();
const fakeUserObj = fakeUser();



const mocks = [
    {
        request: {
            query: SUBREDDIT_MEDIA_POST_MUTATION,
            variables: {
                title:fakePostObj.title,
                subreddit_id:fakePostObj.subreddit.id,
                content:"",
                link: "https://cdn.fileinfo.com/img/ss/sm/png_79.jpg",
                type: 'image'
            }
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

    },
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { authenticatedItem: fakeUserObj}}
    }

  ];

describe('It switches subreddit content based on props', () => {
    it ('tries to renders a text form with being logged in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        await screen.findByText('Create Link/Media Post');
        expect(container).toMatchSnapshot();
        
    });

    it ('succesfully submits data and gets a desired response', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" id={fakePostObj.subreddit.id}  subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )
       

        await screen.findByText('Create Link/Media Post'); 

        await userEvent.type(screen.getByLabelText('Title'), fakePostObj.title);
        await userEvent.type(screen.getByLabelText('Link'), fakePostObj.link);
        await userEvent.click(screen.getByText('Create Link/Media Post'));

        await waitFor(() => wait(0));

        await screen.findByText('Success.'); 
    })


})