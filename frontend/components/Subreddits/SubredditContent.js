import Link from 'next/link';
import React from 'react';

import PropTypes from 'prop-types';
import SubredditPostForm from './SubredditPostForm';
import SubredditHomePage from './SubredditHomePage';
import SubredditCommentsContainer from './SubredditCommentsContainer';
import SubredditMediaForm from './SubredditMediaForm';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';


function SubredditContent(props) {

    switch(props.type) {
        case 'Home': 
            if (props.slug && props.subreddit) {
                return <SubredditHomePage slug={props.slug} id={props.subreddit.id} subreddit={props.subreddit}/>
            }
            return <span>Something was missing here</span>
        case 'comment':
            if (props.slug && props.subreddit && props.postslug && props.postid) {
                return <SubredditCommentsContainer slug={props.slug} subreddit={props.subreddit} postslug={props.postslug} postid={props.postid}/>
            }
            return <span>Something was missing here</span>
        case 'form':
            if (props.selftext && props.selftext === "true") {
                return (
                    <SubredditPostForm slug={props.slug} id={props.subreddit.id} />
                )
            }
            return (
                <SubredditMediaForm slug={props.slug} id={props.subreddit.id} />
            )
        default: 
            return (
                <span>Something went wrong...</span>
            )
    }
    

}


export default SubredditContent;