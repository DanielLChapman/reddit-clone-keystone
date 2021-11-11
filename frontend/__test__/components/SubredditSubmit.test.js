import { act, render, screen, waitFor } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import { signedInMocks, signedInMocksWithPosts } from '../helpers/generalMocks';
import wait from 'waait';
import SubredditCreatePage from '../../pages/subreddits/create';
import { fakeSubreddit } from '../../lib/testUtils';
import userEvent from '@testing-library/user-event';
import { CREATE_SUBREDDIT_MUTATION } from '../../components/SubredditSubmit';
import  Router  from 'next/router';

const subreddit = fakeSubreddit();

jest.mock('next/router', () => ({
    push: jest.fn(),
  }));

const mocks = [
    // Mutation Mock
    ...signedInMocks, 
    {
      request: {
        query: CREATE_SUBREDDIT_MUTATION,
        variables: {
          name: subreddit.name,
          description: subreddit.description,
          sidebar: subreddit.sidebar,
          title: subreddit.title,
          slug: subreddit.name.toLowerCase(),
        },
      },
      result: {
        data: {
          createSubreddit: {
            id: subreddit.id,
            __typename: 'Subreddit',
            name: subreddit.name,
          },
        },
      },
    },

  ];

describe('it renders a subreddit submit page and submits successfully', () => {
    it ('does not load unless signed in', async () => {
        const { container, debug } = render(
            <MockedProvider >
              <SubredditCreatePage />
            </MockedProvider>
        );

        await screen.findByText(
            'Sign Into Your Account'
        );

        expect(container).toMatchSnapshot();
    });

    it ('loads when signed in', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedInMocks}>
              <SubredditCreatePage />
            </MockedProvider>
        );

        await screen.findByText(
            'Create Subreddit'
        );

        expect(container).toMatchSnapshot();
    });

    it ('calls the mutation', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
              <SubredditCreatePage />
            </MockedProvider>
        );

        await screen.findByText(
            'Create Subreddit'
        );

        await userEvent.type(screen.getByPlaceholderText('name'), subreddit.name);
        await userEvent.type(screen.getByPlaceholderText('title'), subreddit.title);
        await userEvent.type(screen.getByPlaceholderText('description'), subreddit.description);
        await userEvent.type(screen.getByPlaceholderText('sidebar'), subreddit.sidebar);

        await userEvent.click(screen.getByText('Create Subreddit'));

        await waitFor(() => wait(0));
        expect(Router.push).toHaveBeenCalled();
    });
})