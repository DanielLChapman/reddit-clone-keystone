import { act, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { signedInMocks, signedInMocksWithPosts } from "../helpers/generalMocks";
import wait from "waait";
import SearchPage from "../../components/SearchPage/SearchPage";
import gql from "graphql-tag";
import { fakeSubreddit, fakeTextPost } from "../../lib/testUtils";

const fakeSubreddits = [1, 2, 3, 4, 5].map((x) => {
    return fakeSubreddit();
});

const fakePosts = [1, 2, 3, 4, 5].map((x) => {
    return fakeTextPost();
});


const SEARCH_QUERY = gql`
    query SEARCH_QUERY($searchTerm: String!) {
        allSubreddits(
            where: {
                OR: [
                    { name_contains_i: $searchTerm }
                    { description_contains_i: $searchTerm }
                ]
            }
        ) {
            id
            slug
            title
            createdAt
            name
        }
        allPosts(
            where: {
                OR: [
                    { content_contains_i: $searchTerm }
                    { title_contains_i: $searchTerm }
                ]
            }
        ) {
            id
            title
            user {
                username
            }
            subreddit {
                slug
                name
                createdAt
            }
            createdAt
        }
    }
`;

const mocks = [
    // Mutation Mock
    ...signedInMocks, 
    {
      request: {
        query: SEARCH_QUERY,
        variables: {"searchTerm":"a"},
      },
      result: {
        data: {
            allSubreddits: [],
            allPosts: [],
        },
      },
    },

  ];

describe("It renders the search page accurately", () => {
    it("renders results accurately", async () => {
        const { container, debug } = render(
            <MockedProvider mocks={mocks}>
                <SearchPage query={"a"} />
            </MockedProvider>
        );

        await waitFor(() => wait(0));

        await screen.findByText('Title');

    });
});
