import React, { useState } from 'react';
import PropTypes from 'prop-types'
import SignOut from './Signout';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faUserAlt } from '@fortawesome/free-solid-svg-icons';

function TopBarDropdown(props) {
    let [open, setOpen] = useState(false);
    //display user as this needs the user to be logged in to view

    //a state that decides whether the dropdown should be visible or not

    

    let style = {
        display: 'block'
    }

    if (!open) {
        style = {
            display: 'none'
        }
    }

    return (
        <>
            {
                /*
<div className="top-bar-dropdown" onClick={() => {setOpen(!open)}}>
                
            </div>
            <div style={style} className="top-bar-dropdown-revealed">
                <ul>
                    <li>
                        <span style={{float: 'left'}}>Karma</span>  <span style={{float: 'right'}}>{props.user.postVotes + props.user.commentVotes || 0}</span>
                    </li>
                    <li>
                        <span style={{float: 'left'}}><Link href={`/user/${props.user.username}`}>Profile</Link></span>
                    </li>
                    <li>
                        <SignOut />
                    </li>
                </ul>
                
            </div>
                */
            }
            
        </>
    );
}

TopBarDropdown.propTypes = {
    user: PropTypes.object.isRequired
}

export default TopBarDropdown;