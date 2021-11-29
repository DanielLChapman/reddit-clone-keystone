import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import bestMatch from '../../lib/getEditDistance';
import sortingPosts from '../../lib/postSorting';
import Error from '../Error';

/* allPosts(where: {
    OR: [
        {content_contains_i: $searchTerm},
        {title_contains_i: $searchTerm}
    ]}) {
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
}) */

const SEARCH_QUERY = gql`
    query SEARCH_QUERY($searchTerm: String!) {
        allSubreddits(where: {
            OR: [
                {name_contains_i: $searchTerm},
                {description_contains_i: $searchTerm}
            ]
        }) {
            id
            slug
            title
            createdAt
            name
        }
        allPosts(where: {
            OR: [
                {content_contains_i: $searchTerm},
                 {title_contains_i: $searchTerm}
            ]
        }) {
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

function SearchPage(props) {


    const {data, error, loading} = useQuery(SEARCH_QUERY, {
        variables: {
            searchTerm: props.query
        }
    });

    if (error) {return <Error error={error} />} 
    if (loading) return <span>Loading....</span>

    let subreddits = [...data.allSubreddits];
    let posts = [...data.allPosts]
    //subreddit response
    
    let sortedSubreddits = bestMatch(subreddits, props.query, 'name').reverse();

    //get top 5
    if (sortedSubreddits.length > 5) {
        sortedSubreddits = sortedSubreddits.slice(0, 5);
    }


    //post response
    let sortedPosts = bestMatch(posts, props.query, 'title').reverse();
    if (sortedPosts.length === 0 && sortedSubreddits.length === 0) {
        return (
            <div>
                <h3>Nothing Found</h3>
            </div>
        )
    } 
    return (
        <>
            {
                sortedSubreddits.length > 0 && (
                    <section className="subreddit-search-display">

                    </section>
                )
            }
            {
                sortedPosts.length > 0 && (
                    <section className="subreddit-search-display">

                    </section>
                )
            }



        </>
    );
}

SearchPage.propTypes = {
    query: PropTypes.string.isRequired
}

export default SearchPage;