import { gql, useQuery } from '@apollo/client';
import React from 'react';
import SubredditContent from '../../../../../../components/Subreddits/SubredditContent';
import { GET_SUBREDDIT_INFO } from '../../../../../../components/Subreddits/SubredditPage';

const GET_SPECIFIC_COMMENTS = gql`
    query GET_SPECIFIC_COMMENTS($id: ID!) {
        Comment (
            where: {
                id: $id
            }
        ) {
            id
            parent {
                id
            }
            content
            createdAt
            user {
                id
                username
            }
            votes {
                vflag
            }
            children {
                id
                parent {
                    id
                }
                content
                createdAt
                user {
                    id
                    username
                }
                votes {
                    vflag
                }
                children {
                    id
                    parent {
                        id
                    }
                    content
                    createdAt
                    user {
                        id
                        username
                    }
                    votes {
                        vflag
                    }
                    children {
                        id
                        parent {
                            id
                        }
                        content
                        createdAt
                        user {
                            id
                            username
                        }
                        votes {
                            vflag
                        }
                        children {
                            id
                            parent {
                                id
                            }
                            content
                            createdAt
                            user {
                                id
                                username
                            }
                            votes {
                                vflag
                            }
                        }
                    }
                }
            }
        } 
    }
`;

function IndividualComments(props) {

    const {data, error, loading} = useQuery(GET_SUBREDDIT_INFO, {
        variables: {
            slug: props.query.slug
        }
    });

    if (error) return <span>Error... Please try again later</span>
    if (loading) return <span>Loading....</span>

    const {data:commentsData, error: commentsError, loading: commentsLoading} = useQuery(GET_SPECIFIC_COMMENTS, {
        variables: {
            id: props.query.comment_id
        }
    });

    if (commentsLoading) return <span>Loading....</span>
    if (commentsError) return <span>Error... Please try again later</span>

    let comments = commentsData.Comment;
    let commentArray = [{...comments}];
    commentArray[0].parent = '1';
    delete commentArray[0].children;

    let queue = [...comments.children];
    while(queue.length > 0) {
        let x = queue.shift();
        queue = [...queue, ...x.children];
        commentArray.push(x);
    };


    return (
        <div>
            <SubredditContent type="permalinkedcomments" commentid={props.query.comment_id} commentArray={commentArray} slug={props.query.slug} postslug={props.query.post_slug} postid={props.query.id} subreddit={data.allSubreddits[0]}/>
        </div>
    );
}

export default IndividualComments;