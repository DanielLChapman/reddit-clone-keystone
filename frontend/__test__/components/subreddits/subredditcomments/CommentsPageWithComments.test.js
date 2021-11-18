import { act, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";
import { fakeComment, fakeTextPost, fakeUser } from "../../../../lib/testUtils";
import { GET_SUBREDDIT_INFO } from "../../../../components/Subreddits/SubredditPage";
import Posts from "../../../../pages/r/[slug]/comments/[id]/[post_slug]";
import { CURRENT_USER_QUERY } from "../../../../components/User";
import { GET_POST_INFO } from "../../../../components/Subreddits/SubredditCommentsContainer";
import userEvent from "@testing-library/user-event";
import gql from "graphql-tag";

const myMock = jest.fn();

let fakePostObj = {
    ...fakeTextPost(),
    comments: [
        {
            ...fakeComment(),
        },
    ],
};
let subreddit = fakePostObj.subreddit;
const fakeUserObj = {
    ...fakeUser(),
    owner: [
        {
            id: subreddit.id,
            name: subreddit.name,
            slug: subreddit.name.toLowerCase(),
        },
    ],
};
let fakeCommentObj = { ...fakeComment(), post: { ...fakePostObj } };

//Error with importing these two*

const CREATE_VOTE = gql`
    mutation CREATE_VOTE($post_id: ID!, $vflag: String!) {
        createCommentVote(
            data: { comment: { connect: { id: $post_id } }, vflag: $vflag }
        ) {
            id
            vflag
        }
    }
`;
const SUBMIT_POST_WITHOUT_PARENT_MUTATION = gql`
    mutation SUBMIT_POST_WITHOUT_PARENT_MUTATION(
        $post_id: ID!
        $content: String!
    ) {
        createComment(
            data: { content: $content, post: { connect: { id: $post_id } } }
        ) {
            id
            content
            createdAt
            parent {
                id
            }
            user {
                id
                username
            }
            votes {
                vflag
            }
        }
    }
`;

const signedOutMocks = [

    {
        request: {
            query: GET_SUBREDDIT_INFO,
            variables: {
                slug: fakePostObj.subreddit.name.toLowerCase(),
            },
        },
        result: () => {
            return {
                data: {
                    allSubreddits: [
                        {
                            id: subreddit.id,
                            name: subreddit.name,
                            title: subreddit.title,
                            slug: subreddit.name.toLowerCase(),
                            sidebar: subreddit.sidebar,
                            description: subreddit.description,
                            status: "Public",
                            owner: {
                                username: subreddit.owner.username,
                            },
                            moderators: [],
                            createdAt: subreddit.createdAt,
                        },
                    ],
                },
            };
        },
    },

    {
        request: {
            query: GET_POST_INFO,
            variables: {
                id: fakePostObj.id,
            },
        },
        result: {
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
                        slug: fakePostObj.subreddit.slug,
                    },
                    type: fakePostObj.type,
                    comments: fakePostObj.comments,
                },
            },
        },
    },
    {
        request: {
            query: SUBMIT_POST_WITHOUT_PARENT_MUTATION,
            variables: {
                post_id: fakePostObj.id,
                content: fakeCommentObj.content,
            },
        },
        result: {
            data: {
                createComment: {
                    id: fakeCommentObj.id,
                    content: fakeCommentObj.content,
                    createdAt: fakeCommentObj.createdAt,
                    parent: { id: 1 },
                    user: {
                        id: fakeUserObj.id,
                        username: fakeUserObj.username,
                    },
                    votes: {
                        vflag: [],
                    },
                },
            },
        },
    },
    {
        request: {
            query: CREATE_VOTE,
            variables: {
                post_id: fakePostObj.id,
                vflag: "Upvote",
            },
        },
        result: {
            data: {
                createCommentVote: {
                    id: "123456789createCommentVote",
                    vflag: "Upvote",
                },
            },
        },
    },
];

const signedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                authenticatedItem: {
                    ...fakeUserObj,
                },
            },
        },
    },
    {
        request: {
            query: GET_SUBREDDIT_INFO,
            variables: {
                slug: fakePostObj.subreddit.name.toLowerCase(),
            },
        },
        result: () => {
            return {
                data: {
                    allSubreddits: [
                        {
                            id: subreddit.id,
                            name: subreddit.name,
                            title: subreddit.title,
                            slug: subreddit.name.toLowerCase(),
                            sidebar: subreddit.sidebar,
                            description: subreddit.description,
                            status: "Public",
                            owner: {
                                username: subreddit.owner.username,
                            },
                            moderators: [],
                            createdAt: subreddit.createdAt,
                        },
                    ],
                },
            };
        },
    },

    {
        request: {
            query: GET_POST_INFO,
            variables: {
                id: fakePostObj.id,
            },
        },
        result: {
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
                        slug: fakePostObj.subreddit.slug,
                    },
                    type: fakePostObj.type,
                    comments: fakePostObj.comments,
                },
            },
        },
    },
    {
        request: {
            query: SUBMIT_POST_WITHOUT_PARENT_MUTATION,
            variables: {
                post_id: fakePostObj.id,
                content: fakeCommentObj.content,
            },
        },
        result: {
            data: {
                createComment: {
                    id: fakeCommentObj.id,
                    content: fakeCommentObj.content,
                    createdAt: fakeCommentObj.createdAt,
                    parent: { id: 1 },
                    user: {
                        id: fakeUserObj.id,
                        username: fakeUserObj.username,
                    },
                    votes: {
                        vflag: [],
                    },
                },
            },
        },
    },
    {
        request: {
            query: CREATE_VOTE,
            variables: {
                post_id: fakePostObj.id,
                vflag: "Upvote",
            },
        },
        result: {
            data: {
                createCommentVote: {
                    id: "123456789createCommentVote",
                    vflag: "Upvote",
                },
            },
        },
    },
];

let query = {
    slug: fakePostObj.subreddit.name.toLowerCase(),
    id: fakePostObj.id,
    post_slug: fakePostObj.post_slug,
};


describe("It accurately displays the comment page", () => {
    it("renders a post page with a comment on it", async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedInMocks}>
                <Posts query={query} />
            </MockedProvider>
        );



        await screen.findByText("Posted 0 minutes ago");
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent(fakePostObj.comments[0].content);
    });

    it('renders a comment box under a comment when you are signed in', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedInMocks}>
                <Posts query={query} />
            </MockedProvider>

        );
        await screen.findByText("Posted 0 minutes ago");
        let a = await screen.findAllByPlaceholderText('What are your thoughts?');
        expect(a.length).toBe(1);

        await userEvent.click(screen.getByText('Reply'));
        await waitFor(() => wait(0));

        let b = await screen.findAllByPlaceholderText('What are your thoughts?');
        expect(b.length).toBe(2);
    });

    it('does not render reply when not signed in', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedOutMocks}>
                <Posts query={query} />
            </MockedProvider>

        );
        await screen.findByText("Posted 0 minutes ago");

        expect(screen.queryByText('Reply')).not.toBeInTheDocument()

        expect(screen.queryByText('Permalink')).toBeInTheDocument();

    })
});
