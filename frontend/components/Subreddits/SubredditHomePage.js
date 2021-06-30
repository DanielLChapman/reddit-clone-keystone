import React from 'react';
import Link from 'next/link';
import { useUser } from '../User';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import sortingPosts from '../../lib/postSorting';
import PostMain from '../SmallPosts/PostMain';

export function createdAtConvert(dateString) {
    let d = new Date(dateString).toDateString();
    d = d.slice(4);
    d = d.split(' ');
    d[0] = d[0] + " " + d[1];
    return d[0] + ', ' + d[2];
}

const COUNT_MEMBERS = gql`
    query COUNT_MEMBERS($id: ID!) {
        _allUsersMeta(
            where: {
                subreddits_some: {
                    id: $id
                }
            }
        ) {
            count
        }
    }
`;

export const GET_POSTS_FROM_SUBREDDIT = gql`
    query GET_POSTS_FROM_SUBREDDIT($id: ID!, $skip: Int) {
        allPosts(
            where: {
                subreddit: {
                    id: $id
                },
            },
            skip: $skip,
            first: 200,
            ) {
                id
                content
                title
                user {
                    id
                    name
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
            
        }
    }


`;
    

function SubredditHomePage(props) {
    const user = useUser();
    const {data: userData, error: userError, loading: userLoading} = useQuery(COUNT_MEMBERS, {
        variables: {
            id: props?.subreddit.id
        }
    });
    const {data, error, loading} = useQuery(GET_POSTS_FROM_SUBREDDIT, {
        variables: {
            id: props?.subreddit?.id,
            skip: 0
        }
    }) 

    if (error) return <span>Nothing to see here!</span>
    if (loading) return <span>Loading....</span>

    let posts = data.allPosts;

    posts = sortingPosts(posts, 'Best');

    return (
        <>
            <div className="subreddit-left">
               {
                    posts && posts.map((x) => {
                        return <PostMain post={x} key={x.id} />
                    })
                }
                {
                    posts.length === 0 && (
                        <span>Nothing to see here...</span>
                     )
                                                
                    
                }


            </div>
            <div className="subreddit-right">
                { user && (
                        <div>
                            
                                <Link href={`/r/${props.slug}/submit`}>
                                    <a>
                                        <div className="block-link">
                                            Create a Link Post
                                        </div>
                                    </a>
                                </Link>
                            
                                <Link href={`/r/${props.slug}/submit?selftext=true`}>
                                <a>
                                        <div className="block-link">
                                            Create a Text Post
                                        </div>
                                    </a>
                                </Link>    
                            
                        </div>
                    )
                }

                <section className="subreddit-right-box">
                    <header>
                        About Community
                    </header>
                    <section className="subreddit-about-box-description">
                        {props?.subreddit?.description}
                        <br />
                        
                    </section>
                    <section className="subreddit-members">
                        {userData._allUsersMeta.count}
                        <br />
                        Members
                    </section>
                    <section className="subreddit-created-at">
                        🎂 &nbsp; Created {createdAtConvert(props.subreddit.createdAt)}
                    </section>
                </section>

                <section className="subreddit-right-box">
                    <header>
                        Rules
                    </header>
                    <section className="subreddit-about-box-description">
                        {props?.subreddit?.sidebar}
                        <br />
                        
                    </section>
                </section>

                <section className="subreddit-right-box">
                    <header>
                        Rules
                    </header>
                    <section className="subreddit-about-box-description">
                        {props?.subreddit?.sidebar}
                        <br />
                        
                    </section>
                </section>
        
            </div>
        </>
    )
        
}

SubredditHomePage.propTypes = {
    subreddit: PropTypes.object.isRequired,

}

export default SubredditHomePage;