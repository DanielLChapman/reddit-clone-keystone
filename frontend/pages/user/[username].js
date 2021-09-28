import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useUser } from '../../components/User';
import Comments from '../../components/UserPage/Comments';
import MainPage from '../../components/UserPage/MainPage';
import Posts from '../../components/UserPage/Posts';
import sortingPosts from '../../lib/postSorting';



//need to get user 
const GET_USER_PAGE = gql`
    query GET_USER_PAGE($caseusername: String!) {
        allUsers(where: {
            case_username: $caseusername
        }) {
            id
            username
            posts {
                id
                title
                subreddit {
                    id
                    slug
                    name
                }
                createdAt
                post_slug
                link
                type
                removed
                comments {
                    id

                }
                votes {
                    vflag
                }
            }
            comments {
                content
                createdAt
                parent {
                    id
                }
                id
                post {
                    post_slug
                    id
                    title
                    user {
                        username
                    }
                    subreddit {
                        id
                        slug
                        name
                    }
                }
                
                votes {
                    vflag
                }
            }
            moderating {
                id
                slug
                name
            }
            owner {
                id
                slug
                name
            }
        }
    }
`;

const UserNamePage = (props) => {
    let user = useUser();
    let owner = false;

    let [active, setActive] = useState(0);

    if (user) {
        owner = user.username === props.query.username;
    }

    if (!props.query.username || props.query.username.length === 0) return <span>Error</span>

    const {data, error, loading} = useQuery(GET_USER_PAGE, {
        variables: {
            caseusername: props.query.username.toLowerCase()
        }
    });

    if (error) return <span>Error</span>
    if (loading) return <span>Loading...</span>

    if (data?.allUsers.length === 0) return <span>Error... User Not Found</span>
    return (
        <MainPage query={props.query} user={user} allUsers={data.allUsers[0]} active={active} setActive={setActive} />
    )
}

export default UserNamePage;