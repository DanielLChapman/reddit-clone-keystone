import Link from 'next/link';
import React from 'react';

import PropTypes from 'prop-types';
import SubredditPostForm from './SubredditPostForm';
import SubredditHomePage from './SubredditHomePage';
import SubredditComments from './SubredditComments';


function SubredditContent(props) {
    
    if (props.type === "form") {
        return (
            <SubredditPostForm slug={props.slug} />
        )
    }

    else if (props.type === "comment") {
        return <SubredditComments slug={props.slug} />
    }
    
    return (
        <div>
            <SubredditHomePage slug={props.slug} />
        </div>
    )
    

}


export default SubredditContent;