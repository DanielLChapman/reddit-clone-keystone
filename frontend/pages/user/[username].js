import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useUser } from '../../components/User';
import Comments from '../../components/UserPage/Comments';
import Posts from '../../components/UserPage/Posts';
import sortingPosts from '../../lib/postSorting';

//delete comment
const DELETE_COMMENT = gql`
    mutation DELETE_COMMENT($id: ID!) {
        deleteComment(id: $id) {
            id
        }
    }
`;

//delete comment
const DELETE_POST = gql`
    mutation DELETE_POST($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

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

    let postArray = sortingPosts( [...data.allUsers[0].comments, ...data.allUsers[0].posts], 'New');
    //combine all posts and comments

    //get the users karma
    let postVotes = 0;
    let commentVotes = 0;
    
    data?.allUsers[0].posts.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? postVotes += 1 : postVotes -= 1;
      })
    });
    //count up comment votes
    data?.allUsers[0].comments.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? commentVotes += 1 : commentVotes -= 1;
      })
    });

    let displayUser = data?.allUsers[0];
    
    const [deleteCommentFunction, { data: data_delete_comment, error: error_delete_comment, loading: loading_delete_comment }] = useMutation(DELETE_COMMENT);
    const [deletePostFunction, { data: data_delete_post, error: error_delete_post, loading: loading_delete_post }] = useMutation(DELETE_COMMENT);


    return (
        <div className="user-page">
            <section className="link-bar">
                
            </section>
            <div className="user-page-flex">
                <section className="right user-info">
    
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{displayUser.username}</span></span>
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{postVotes}</span> post karma</span>
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{commentVotes}</span> comment karma</span>


                </section>
                <section className="left post-side">
                    {/* filter for removed comments and postsones unless they are the owner */}
                    {
                    postArray.map((x, i) => {
                        if (x.__typename === 'Comment') {
                            
                            return <div key={i} id={i} onClick={() => {
                                setActive(i);
                            }} className={`comment-user-page ${active === i ? 'active' : ''}`}><Comments deleteFunction={deleteCommentFunction} username={props.query.username} user={user} comment={x} /></div>
                        } else {
                            return <div key={i} id={i} onClick={() => {
                                setActive(i);
                            }} className={`comment-user-page ${active === i ? 'active' : ''}`}><Posts deleteFunction={deletePostFunction} username={props.query.username} user={user} post={x} /></div>;
                        }
                    })
                }
                </section>
                
            </div>
            
        </div>
    );
}

export default UserNamePage;