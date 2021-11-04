import { render, screen } from '@testing-library/react';
import { fakeLinkPost, fakeMediaPost, fakeTextPost, fakeUser } from '../../lib/testUtils';
import {MockedProvider} from '@apollo/react-testing';
import FrontPage, { GET_FRONT_PAGE_POSTS } from '../../components/FrontPage';
import { CURRENT_USER_QUERY } from '../../components/User';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

let fakePosts = [fakeLinkPost(), fakeMediaPost(), fakeMediaPost(), fakeTextPost()];
let fakeSubreddits = fakePosts.map((x) => {
    return {
        id: x.id,
        content: x.content || '',
        title: x.title,
        user: {
            id:x.user.id,
            username:x.user.username
        },
        removed: x.removed,
        createdAt: x.createdAt,
        votes: [],
        post_slug: x.post_slug,
        link: x.link || '',
        type: x.type,
        subreddit: {
            name: x.subreddit.name,
            id: x.subreddit.id,
            slug: x.subreddit.slug,
        },
        comments: []
    }
});



const mocks = [
    {
      // When someone requests this query and variable combo
      request: {
        query: GET_FRONT_PAGE_POSTS,
        variables: {
            subreddits:["609446a1438ea508cdf752c3","609446b8438ea508cdf752c4","609446c3438ea508cdf752c5","609446cf438ea508cdf752c6","609446e0438ea508cdf752c7","609446fa438ea508cdf752c8","60944706438ea508cdf752c9"],
            skip:0
        }
      },
      // Return this data
      result: {
        data: {
            allPosts: [...fakeSubreddits],
        },
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

describe('<PostMain />', () => {
    it ('renders out the given posts on the front page', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
              <FrontPage />
            </MockedProvider>
          );
          // Wait for the test ID to show up
          await screen.findByTestId('frontPage');
     
          expect(container).toMatchSnapshot();
    });

    it('Errors out when an item is no found', async () => {
        const errorMock = [
          {
            request: {
              query: GET_FRONT_PAGE_POSTS,
              variables: {"subreddits":["609446a1438ea508cdf752c3","609446b8438ea508cdf752c4","609446c3438ea508cdf752c5","609446cf438ea508cdf752c6","609446e0438ea508cdf752c7","609446fa438ea508cdf752c8","60944706438ea508cdf752c9"],"skip":0}
            },
            result: {
              errors: [{ message: 'Error Loading Posts. Try Again Later Or Contact Dev' }],
            },
          },
        ];
        const { container, debug } = render(
          <MockedProvider mocks={errorMock}>
            <FrontPage/>
          </MockedProvider>
        );
        await screen.findByTestId('graphql-error');

        expect(container).toHaveTextContent('Error Loading Posts. Try Again Later Or Contact Dev');
      });
    
});