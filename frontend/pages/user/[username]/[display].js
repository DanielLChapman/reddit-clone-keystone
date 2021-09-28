import React from 'react';
import UserNamePage from '../[username]';

function UserPageWithQuery(props) {
    //display should only be comments or submitted
    if (props.query) {
        let queryCopy = {...props.query};
        if (['comments', 'submitted'].includes(queryCopy.display.toLowerCase())) {
            queryCopy.display = queryCopy.display.toLowerCase();
        } else {
            queryCopy.display = 'overview';
        } 
     
        return (
            <UserNamePage query={queryCopy} />
        );
    } else {
        return <span>Error...</span>
    }
    
}

export default UserPageWithQuery;