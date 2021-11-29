import { act, render, screen, waitFor } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import { signedInMocks, signedInMocksWithPosts } from '../helpers/generalMocks';
import wait from 'waait';
import { fakeSubreddit, fakeUser } from '../../lib/testUtils';
import userEvent from '@testing-library/user-event';
import { CREATE_SUBREDDIT_MUTATION } from '../../components/SubredditSubmit';
import  Router  from 'next/router';
import SubredditEditPage from '../../pages/r/[slug]/edit';
import { GET_SUBREDDIT_INFO } from '../../components/Subreddits/SubredditPage';
import { CURRENT_USER_QUERY } from '../../components/User';
import { EDIT_SUBREDDIT_MUTATION } from '../../components/SubredditEdit';

const subreddit = fakeSubreddit();
const user = fakeUser();

jest.mock('next/router', () => ({
    push: jest.fn(),
}));

const mocks = [
    // Mutation Mock
    {
      request: {
        query: GET_SUBREDDIT_INFO,
        variables: {
          slug: subreddit.name.toLowerCase(),
        },
      },
      result: () => {
        return {
      data: { allSubreddits: [{ 

          id: subreddit.id,
          name: subreddit.name,
          title: subreddit.title,
          slug: subreddit.name.toLowerCase(),
          sidebar: subreddit.sidebar,
          description: subreddit.description,
          status: 'Public',
          owner: {
              username:subreddit.owner.username,
          },
          moderators: [],
          createdAt: subreddit.createdAt,
      }] },
    }},
    },

  ];
  
  const signedInCustomMocks = [
    ...signedInMocks,
    ...mocks
  ]

  let correctMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem:  {
          ...user,
          owner: [{
            id: subreddit.id,
            name: subreddit.name,
            slug: subreddit.name.toLowerCase()
          }]
      } } },
    },
    {
      request: {
        query: GET_SUBREDDIT_INFO,
        variables: {
          slug: subreddit.name.toLowerCase(),
        },
      },
      result: () => {
        return {
          data: { 
            allSubreddits: [{ 
              id: subreddit.id,
              name: subreddit.name,
              title: subreddit.title,
              slug: subreddit.name.toLowerCase(),
              sidebar: subreddit.sidebar,
              description: subreddit.description,
              status: subreddit.status,
              owner: {
                  username:subreddit.owner.username
              },
              moderators: [],
              createdAt: subreddit.createdAt,
            }] 
          },
        }
      },
    },
    {
      request: { query: EDIT_SUBREDDIT_MUTATION,
        variables: {
          id:subreddit.id,
          name:subreddit.name,
          description:subreddit.description,
          sidebar:subreddit.sidebar,
          title:subreddit.title+subreddit.title,
          slug: subreddit.name.toLowerCase(),
        } },
      result: { data: { updateSubreddit:  {
          id: subreddit.id,
          __typename: 'Subreddit'
      } } },
    },
]

/*
const EDIT_SUBREDDIT_MUTATION = gql`
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
*/

describe('it renders a subreddit submit page and submits successfully', () => {
    it ('does not load unless signed in', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
              <SubredditEditPage query={{slug: subreddit.name.toLowerCase()}}/>
            </MockedProvider>
        );

        await screen.findByText(
            'Sign Into Your Account'
        );
        expect(container).toMatchSnapshot();
    });

    it ('loads when signed in, but not with the correct permissions', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedInCustomMocks}>
              <SubredditEditPage query={{slug: subreddit.name.toLowerCase()}}/>
            </MockedProvider>
        );

        await screen.findByText(
            'You dont have the required permission for this.'
        );

        expect(container).toMatchSnapshot();
    });

    it ('loads when signed in', async () => {
      const { container, debug } = render(
          <MockedProvider mocks={correctMocks}>
            <SubredditEditPage query={{slug: subreddit.name.toLowerCase()}}/>
          </MockedProvider>
      );

      await screen.findByText('Title');

      expect(container).toMatchSnapshot();
  });

    it ('calls the mutation', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={correctMocks}>
              <SubredditEditPage query={{slug: subreddit.name.toLowerCase()}} />
            </MockedProvider>
        );

        await screen.findByText('Title');
        await userEvent.type(screen.getByLabelText('Title'), subreddit.title);
        
        await userEvent.click(screen.getByText('Edit'));

        await waitFor(() => wait(0));

        expect(container).toHaveTextContent('Successfully updated.');
        
    });
})