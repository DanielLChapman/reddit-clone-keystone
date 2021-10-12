import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import sortingPosts from '../../lib/postSorting';
import Comments from './Comments';
import Posts from './Posts';
import Link from 'next/link';
import capitalize, { uniqBy } from '../../lib/capitalize';

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

function MainPage(props) {
    let allUsers = props.allUsers;
    let sortType = props.query.display || 'overview';

    let dataToSort = [];
    //combine all posts and comments
    if (allUsers) {
        switch(sortType) {
            case 'comments':
                dataToSort = [...allUsers.comments];
                break;
            case 'submitted':
                dataToSort = [...allUsers.posts];
                break;
            default:
                dataToSort = [...allUsers.comments, ...allUsers.posts];
                break;
        }
    }
    

    let postArray = sortingPosts( dataToSort, 'New');

    //get the users karma
    let postVotes = 0;
    let commentVotes = 0;
    
    allUsers?.posts.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? postVotes += 1 : postVotes -= 1;
      })
    });
    //count up comment votes
    allUsers?.comments.forEach((q) => {
      q.votes.forEach((y) => {
        y.vflag === 'Upvote' ? commentVotes += 1 : commentVotes -= 1;
      })
    });

    let displayUser = allUsers;
    
    const [deleteCommentFunction, { data: data_delete_comment, error: error_delete_comment, loading: loading_delete_comment }] = useMutation(DELETE_COMMENT);
    const [deletePostFunction, { data: data_delete_post, error: error_delete_post, loading: loading_delete_post }] = useMutation(DELETE_COMMENT);


    return (
        <div className="user-page">
            <section className="link-bar">
                <span><Link href={`/user/${displayUser.username}`}><a className={sortType === 'overview' ? 'active' : ''}>Overview</a></Link></span>
                <span><Link href={`/user/${displayUser.username}/submitted`}><a className={sortType === 'submitted' ? 'active' : ''}>Posts</a></Link></span>
                <span><Link href={`/user/${displayUser.username}/comments`}><a className={sortType === 'comments' ? 'active' : ''}>Comments</a></Link></span>
            </section>
            <div className="user-page-flex">
                <section className="right user-info" style={postArray[0].__typename === 'Comment' ? {top: '-6px'} : {}}>
    
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{displayUser.username}</span></span>
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{postVotes}</span> post karma</span>
                    <span style={{width: '300px', display: 'block'}}><span className="user-info-hightlight">{commentVotes}</span> comment karma</span>
                    <br />
                    {displayUser.moderating.length > 0 || displayUser.owner.length > 0 ? (<>
                        <span style={{width: '300px', display: 'block'}}>
                            <span className="user-info-hightlight">Moderating</span> 
                        </span>
                        
                        {uniqBy([...displayUser.owner, ...displayUser.moderating], 'name').map((x, i) => (
                            <span key={i} style={{width: '300px', display: 'block'}}><a href={`/r/${x.slug}`}>{capitalize(x.name)}</a></span>
                        ))
                        }
                        
                        </>
                    ) : {}}

                </section>
                <section className="left post-side">
                    {/* filter for removed comments and postsones unless they are the owner */}
                    {
                    postArray.map((x, i) => {
                        if (x.__typename === 'Comment') {
                            
                            
                            return <div key={i} id={i} onClick={() => {
                                props.setActive(i);
                            }} className={`comment-user-page ${props.active === i ? 'active' : ''}`}><Comments deleteFunction={deleteCommentFunction} username={props.query.username} user={props.user} comment={x} /></div>
                        } else if (x.__typename === 'Post') {
                            return <div key={i} id={i} onClick={() => {
                                props.setActive(i);
                            }} className={`comment-user-page ${props.active === i ? 'active' : ''}`}><Posts deleteFunction={deletePostFunction} username={props.query.username} user={props.user} post={x} /></div>;
                        }
                    })
                }
                </section>
                
            </div>
            
        </div>
    );
}

export default MainPage;