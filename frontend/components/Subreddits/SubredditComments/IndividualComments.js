import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import convertDateFromNow from "../../../lib/convertDateFromNow";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { CURRENT_USER_QUERY, useUser } from "../../User";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { sortingComments, totalPostsVotes } from "../../../lib/postSorting";
import CommentsBox from "./CommentsSubmitBox";
import CommentsEditBox from "./CommentsEditBox";

function IndividualComments(props) {
    let user;
    if (props.user) {
        user = props.user;
    }
    let [total, setTotal] = useState({
        total: totalPostsVotes(props.comment.commentObject),
    });
    let [content, setContent] = useState(props.comment.content);
    let [userComments, setUserComments] = useState({
        comments: [],
    });

    let [deleted, setDeleted] = useState(false);

    let [reply, openReply] = useState(false);
    let [edit, openEdit] = useState(false);

    let upvoted = user?.commentvotes?.some((x) => {
        if (x?.comment?.id === props?.comment?.id) {
            if (x.vflag === "Upvote") {
                return true;
            }
        }
    });

    let downvoted = user?.commentvotes?.some((x) => {
        if (x?.comment?.id === props?.comment?.id) {
            if (x.vflag === "Downvote") {
                return true;
            }
        }
    });

    if (props.count > 5) {
        return (
            <a
                href={`/r/${props.post.subreddit.slug}/comments/${props.post.id}/${props.post.post_slug}/${props.comment?.parent}`}
                className="continue-this-thread"
            >
                Continue this thread...
            </a>
        );
    }

    const getPostVoteId = () => {
        let id = user?.commentvotes.find((x) => {
            if (x.comment.id === props?.comment.id) {
                return x.id;
            }
        });

        return id.id;
    };

    const updateContent = (newString) => {
        setContent(newString);
        openEdit(false);
    };

    const addToParent = (res) => {
        let x = props.tree.createNode(res.content, res.parent.id, res.id, res);
        setUserComments({
            comments: [x, ...userComments.comments],
        });
    };

    let descendents = sortingComments(
        props.comment.descendents,
        props.sortOption
    );

    return (
        <div
            className="comments-threadline-container"
            style={deleted ? { display: "none" } : {}}
        >
            <div className="threadline"></div>

            <div className={`comments-indent comments-indent-${props.count}`}>
                <section className="comment-top">
                    <span>
                        Posted by&nbsp;
                        <a
                            href={`/user/${props?.comment?.commentObject.user.username}`}
                            className="subreddit-link"
                        >
                            u/{props?.comment?.commentObject.user?.username}
                        </a>
                    </span>{" "}
                    &nbsp;?? &nbsp;
                    <span>
                        {convertDateFromNow(
                            props?.comment.commentObject.createdAt
                        )}
                    </span>{" "}
                    {/* future: edited or not */} {/* Flair */}
                </section>
                <section className="comment-content">
                    {edit ? (
                        <CommentsEditBox
                            commentid={props.comment.id}
                            content={content}
                            user={user}
                            returnFunc={updateContent}
                        />
                    ) : (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    )}
                </section>
                <section className="comment-bottom">
                    <section className="comment-arrows">
                        <FaLongArrowAltUp
                            className={`upvote-arrow ${
                                upvoted ? "upvoted-arrow" : ""
                            }`}
                            onClick={async () => {
                                if (user && user.id) {
                                    if (!upvoted) {
                                        //if its downvoted
                                        if (downvoted) {
                                            //update
                                            const res = await props.updatePostVote(
                                                {
                                                    variables: {
                                                        id: getPostVoteId(),
                                                        vflag: "Upvote",
                                                    },
                                                }
                                            );
                                            setTotal({
                                                total: total.total + 2,
                                            });
                                        } else {
                                            const res = await props.createPostVote(
                                                {
                                                    variables: {
                                                        post_id:
                                                            props.comment.id,
                                                        vflag: "Upvote",
                                                    },
                                                }
                                            );
                                            setTotal({
                                                total: total.total + 1,
                                            });
                                        }
                                    } else {
                                        let id = getPostVoteId();

                                        const res = await props.deletePostVote({
                                            variables: {
                                                id: id,
                                            },
                                        });

                                        setTotal({
                                            total: total.total - 1,
                                        });
                                    }
                                }
                            }}
                        />
                        <span className="total">{total.total}</span>
                        <FaLongArrowAltDown
                            className={`downvote-arrow ${
                                downvoted ? "downvoted-arrow" : ""
                            }`}
                            onClick={async () => {
                                if (user && user.id) {
                                    if (!downvoted) {
                                        //if its downvoted
                                        if (upvoted) {
                                            const res = await props.updatePostVote(
                                                {
                                                    variables: {
                                                        id: getPostVoteId(),
                                                        vflag: "Downvote",
                                                    },
                                                }
                                            );
                                            setTotal({
                                                total: total.total - 2,
                                            });
                                        } else {
                                            const res = await props.createPostVote(
                                                {
                                                    variables: {
                                                        post_id:
                                                            props.comment.id,
                                                        vflag: "Downvote",
                                                    },
                                                }
                                            );
                                            setTotal({
                                                total: total.total - 1,
                                            });
                                        }
                                    } else {
                                        let id = getPostVoteId();

                                        const res = await props.deletePostVote({
                                            variables: {
                                                id: id,
                                            },
                                        });

                                        setTotal({
                                            total: total.total + 1,
                                        });
                                    }
                                }
                            }}
                        />
                    </section>
                    {user && (
                        <>
                            <span
                                onClick={() => {
                                    openReply(!reply);
                                }}
                            >
                                Reply
                            </span>
                            <span
                                onClick={() => {
                                    openEdit(!edit);
                                }}
                            >
                                Edit
                            </span>
                            {props?.comment?.commentObject.user.username ===
                                user.username && (
                                <span
                                    onClick={() => {
                                        let a = confirm(
                                            "Are you sure you want to delete this comment?"
                                        );
                                        if (a) {
                                            props.deleteComment({
                                                variables: {
                                                    id:
                                                        props?.comment
                                                            ?.commentObject.id,
                                                },
                                            });
                                            setDeleted(true);
                                        }
                                    }}
                                >
                                    Delete
                                </span>
                            )}
                        </>
                    )}

                    <span>
                        <a
                            href={`/r/${props.post?.subreddit?.slug}/comments/${props.post.id}/${props.post.post_slug}/${props.comment.id}`}
                        >
                            Permalink
                        </a>
                    </span>
                    {/* Share */}
                </section>
                {reply && (
                    <div className="comments-threadline-container">
                        <div className="threadline"></div>
                        <section
                            className={`comments-indent comment-indent-reply comments-indent-${props.count}`}
                        >
                            <CommentsBox
                                postid={props.post.id}
                                parentid={props.comment.id}
                                returnFunction={addToParent}
                            />
                        </section>
                    </div>
                )}

                <section className="comment-children">
                    {userComments.comments.map((x, i) => {
                        //need to sort descenents first
                        return (
                            <IndividualComments
                                user={user || null}
                                deleteComment={props.deleteComment}
                                tree={props.tree}
                                comment={x}
                                post={props.post}
                                count={props.count + 1}
                                key={x.id}
                                createPostVote={props.createPostVote}
                                deletePostVote={props.deletePostVote}
                                updatePostVote={props.updatePostVote}
                            />
                        );
                    })}
                    {descendents.map((x, i) => {
                        //need to sort descenents first
                        return (
                            <IndividualComments
                                user={user || null}
                                deleteComment={props.deleteComment}
                                tree={props.tree}
                                comment={x}
                                post={props.post}
                                count={props.count + 1}
                                key={x.id}
                                createPostVote={props.createPostVote}
                                deletePostVote={props.deletePostVote}
                                updatePostVote={props.updatePostVote}
                            />
                        );
                    })}
                </section>
            </div>
        </div>
    );
}

export default IndividualComments;
