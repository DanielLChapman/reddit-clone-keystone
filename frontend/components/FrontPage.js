import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { useUser } from './User';

// get front page posts, sorted by some algorithm (upvotes / time posted for now)
const GET_FRONT_PAGE_POSTS = gql`
    query GET_FRONT_PAGE_POSTS($name: String) {
        getFrontPage(name: $name) {
            id
        }
    }
`;

function FrontPage(props) {
    const user = useUser();
    const {data, error, loading} = useQuery(GET_FRONT_PAGE_POSTS
    );
    

    return (
        <div>
            { user && (
                <Link href="/subreddits/create">Create Your Own Subreddit</Link>
            )
            }
        </div>
    );
}

export default FrontPage;