import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SubredditContent from '../../../components/Subreddits/SubredditContent';
import { CURRENT_USER_QUERY } from '../../../components/User';
import SubredditPage, { GET_DOG_QUERY, GET_SUBREDDIT_INFO } from '../../../components/Subreddits/SubredditPage';
import { fakeSubreddit } from '../../../lib/testUtils';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
//import Signup, { SIGNUP_MUTATION } from '../../components/SignUp';

const fakeSubredditObj = fakeSubreddit();

const mocks = [
      {request: {
        query: GET_SUBREDDIT_INFO,
        variables: { slug: fakeSubredditObj.slug },
      },
      result: () => {
          return {
        data: { Subreddit: { 

            id: fakeSubredditObj.id,
            name: fakeSubredditObj.name,
            title: fakeSubredditObj.title,
            slug: fakeSubredditObj.slug,
            sidebar: fakeSubredditObj.sidebar,
            description: fakeSubredditObj.description,
            status: 'Public',
            owner: {
                username: fakeSubredditObj.owner.username,
            },
            moderators: [],
            createdAt: fakeSubredditObj.createdAt,
        } },
      }},
    }
  ];

describe('It switches subreddit content based on props', () => {
    it('renders an error with no props', () => {
        const { container, debug } = render(
            <MockedProvider>
              <SubredditContent />
            </MockedProvider>
          );

          expect(container).toMatchSnapshot();
    });

    it ('renders the home (through subreddit page)', async () => {
        
        const { container, debug } = render(
            <MockedProvider mocks={mocks} >
                <SubredditPage type="Home" slug={fakeSubredditObj.slug} />
            </MockedProvider>
        );

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
    })
})