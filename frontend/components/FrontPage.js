import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { useUser } from './User';

// get front page posts, sorted by some algorithm (upvotes / time posted for now)
const GET_FRONT_PAGE_POSTS = gql`
    query GET_FRONT_PAGE_POSTS($name: String, $skip: Float) {
        getFrontPage(name: $name, skip: $skip) {
            id
            content
            title
            
            createdAt
            votes   {
                vflag
            }
            post_slug
            link
            type
        }
    }
`;

function FrontPage(props) {
    const user = useUser();
    const {data, error, loading} = useQuery(GET_FRONT_PAGE_POSTS,{
        variables: {
            name: 'sdada',
            skip: 0,
        }
    }
        
    );
    
    console.log(data);
    if(loading) return <div>Loading...</div>
    if(error) return <div>{error.error}</div>
    
    
    return (
        
        <div>
            

            { user && (
                    <Link href="/subreddits/create">Create Your Own Subreddit</Link>
                 )
            }
            )}
        </div>
    );
}

export default FrontPage;