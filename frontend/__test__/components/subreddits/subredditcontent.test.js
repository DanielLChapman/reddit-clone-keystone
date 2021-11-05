import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SubredditContent from '../../../components/Subreddits/SubredditContent';
import { CURRENT_USER_QUERY } from '../../../components/User';
import SubredditPage, { GET_DOG_QUERY, GET_SUBREDDIT_INFO } from '../../../components/Subreddits/SubredditPage';
import { fakeSubreddit, fakeTextPost, fakeUser  } from '../../../lib/testUtils';
import wait from 'waait';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { GET_POST_INFO } from '../../../components/Subreddits/SubredditCommentsContainer';
//import Signup, { SIGNUP_MUTATION } from '../../components/SignUp';

const fakeSubredditObj = fakeSubreddit();
const fakePostObj = fakeTextPost();

const signedInMocks = [
    {
      request: { query: CURRENT_USER_QUERY },
      result: { data: { authenticatedItem: fakeUser() } },
    },
  ];

const mocks = [
      {request: {
        query: GET_SUBREDDIT_INFO,
        variables: { slug: fakeSubredditObj.slug },
      },
      result: () => {
          return {
        data: { allSubreddits: [{ 

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
        } ]},
      }},
    },
    {request: {
        query: GET_SUBREDDIT_INFO,
        variables: { slug: fakePostObj.subreddit.slug },
      },
      result: () => {
          return {
        data: { allSubreddit: [{ 

            id: fakePostObj.subreddit.id,
            name: fakePostObj.subreddit.name,
            title: fakePostObj.subreddit.title,
            slug: fakePostObj.subreddit.slug,
            sidebar: fakePostObj.subreddit.sidebar,
            description: fakePostObj.subreddit.description,
            status: 'Public',
            owner: {
                username: fakePostObj.subreddit.owner.username,
            },
            moderators: [],
            createdAt: fakePostObj.subreddit.createdAt,
        }] },
      }},
    },
    {
        request: {
            query: GET_POST_INFO,
            variables: {
                id: fakePostObj.id
            }
        },
        result:  {
            data: {
                Post: {
                    id: fakePostObj.id,
                    content: fakePostObj.content,
                    title: fakePostObj.title,
                    user: {
                        id: fakePostObj.user.id,
                        name: fakePostObj.user.name,
                        username: fakePostObj.user.username,
                    },
                    createdAt: fakePostObj.createdAt,
                    votes: [],
                    post_slug: fakePostObj.post_slug,
                    link: fakePostObj.link,
                    removed: fakePostObj.removed,
                    subreddit: {
                        slug: fakePostObj.subreddit.slug
                    },
                    type: fakePostObj.type,
                    comments: []
                }
            }
        }
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

    it('renders an error with the wrong props', async () => {
        const { container, debug } = render(
            <MockedProvider>
              <SubredditContent type="Comment"/>
            </MockedProvider>
          );

          await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

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
    });

    it ('renders a specific post', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="comment" slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
        );
        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
    });

    it ('renders a perma-linked comment', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="permalinkedcomments" slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
        
        
        )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
    });

    it ('tries to renders a form with self text with being logged in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={signedInMocks} >
                <SubredditContent type="form" selftext="true" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
    })

    it ('tries to renders a form with self text without being logged in', async () => {

        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" selftext="true" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(container).toMatchSnapshot();
    })

    it ('tries to renders a different form without self text without being logged in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={mocks} >
                <SubredditContent type="form" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
    })

    it ('tries to renders a different form without self text with being logged in', async () => {
        const { container, debug} = render(
            <MockedProvider mocks={signedInMocks} >
                <SubredditContent type="form" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

         const { container: container2, debug: debug2} = render(
            <MockedProvider mocks={signedInMocks} >
                <SubredditContent type="form" selftext="true" id={fakePostObj.subreddit.id} slug={fakePostObj.subreddit.slug} postslug={fakePostObj.post_slug} postid={fakePostObj.id} subreddit={fakePostObj.subreddit}/>
            </MockedProvider>
         )

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
        expect(container).not.toEqual(container2);
    })
})