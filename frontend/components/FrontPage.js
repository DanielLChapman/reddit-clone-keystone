import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React, { useState } from 'react';
import PostMain from './SmallPosts/PostMain';
import { useUser } from './User';
import { id_array  } from '../lib/allSubreddits'
import {rawConvertDateFromNow} from '../lib/convertDateFromNow';
import sortingPosts from '../lib/postSorting';
import FilterBar from './FilterBar';
import Dropdown from './Dropdown';

export function arrayUnique(arrayInput) {
    var a = arrayInput.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
} 

// get front page posts, sorted by some algorithm (upvotes / time posted for now)
const GET_FRONT_PAGE_POSTS = gql`
    query GET_FRONT_PAGE_POSTS($subreddits: [ID]!, $skip: Int) {
        allPosts(
            
            where: {
                subreddit: {
                    id_in: $subreddits
                }
            },
            skip: $skip,
            first: 200,
        ) {
            id
            content
            title
            user {
            id
            username
            }
            createdAt
            votes {
            vflag
            }
            post_slug
            link
            type
            subreddit {
                name
                id
                slug
            }
            comments {
                id
            }
        }
    }
`;

function FrontPage(props) {
    const user = useUser();
    let subreddits;
    if (user?.subreddits) {
        subreddits = user.subreddits.map((x) => {
            return x.id
        });

        //get moderating and owning
        let moderatingsubs = user.moderating.map((x) => {
            return x.id;
        })

        let ownersubs = user.owner.map((x) => {
            return x.id
        });

        subreddits = [...subreddits, ...moderatingsubs, ...ownersubs];
        subreddits = arrayUnique(subreddits);

        

    } else {
        subreddits = id_array;
    } 

    const {data, error, loading} = useQuery(GET_FRONT_PAGE_POSTS,{
        variables: {
            subreddits: subreddits,
            skip: 0,
        }
    });

    
    

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error.error}</div>

    let posts = data?.allPosts;
    //sorting posts by votes / posted times
    //filterbar state
    let [filterState, setFilterState] = useState(
        'Best'
    )

    //posts = sortingPosts(posts, filterState);

    return (
        
        <div className="frontpage-content">
            
            <section className="left-side">
                <FilterBar filterState={filterState} setFilterState={setFilterState} />
                {
                    posts && posts.map((x) => {
                        return <PostMain post={x} key={x.id} user={user} />
                    })
                }
            </section>
            <section className="right-side">
                { user && (
                        <Link href="/subreddits/create">Create Your Own Subreddit</Link>
                    )
                }

            </section>
            
            
        </div>
    );
}

export default FrontPage;