import { render, screen } from '@testing-library/react';
import { fakeLinkPost, fakeMediaPost, fakeTextPost, fakeUser } from '../../lib/testUtils';
import {MockedProvider} from '@apollo/react-testing';
import { CURRENT_USER_QUERY } from '../../components/User';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import Search, { SEARCH_QUERY } from '../../components/Search';
import userEvent from '@testing-library/user-event';

let fakePosts = [fakeLinkPost(), fakeMediaPost(), fakeMediaPost(), fakeTextPost()];
let fakeSubreddits = fakePosts.map((x) => {
    return x.subreddit;
});

const mocks = [
    {
      // When someone requests this query and variable combo
      request: {
        query: SEARCH_QUERY,
        variables: {
            searchTerm: 'c'
        }
      },
      result: () => {
        return {
          data: {
            getSearchResults: [
                {   id: fakeSubreddits.id,
                    title: fakeSubreddits.title,
                    subscriber: [],
                    slug: fakeSubreddits.slug,
                    name: fakeSubreddits.name,
                },
            ]
          },
        }
      },
    },
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: {
            data: {
                
            }
        }
    }
]

jest.useFakeTimers("modern")

describe('It correctrly displays the search area with a dropdown', () => {
    it('renders the empty search bar', () => {
        const { container, debug } = render(
            <MockedProvider >
              <Search />
            </MockedProvider>
          );

          expect(container).toMatchSnapshot();
    });




    it('renders the search bar with mocks for lazyQuery', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
              <Search />
            </MockedProvider>

          );

          await screen.findByTestId('search-bar-results');
    

          expect(container).toMatchSnapshot();
    })
})