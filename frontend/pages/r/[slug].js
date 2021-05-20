import React from 'react';
import SubredditPage from '../../components/Subreddits/SubredditPage';

function SubredditSlugPage(props) {
    console.log(props)
    return (
        <div>
            <SubredditPage slug={props.query.slug} />
        </div>
    );
}

export default SubredditSlugPage;