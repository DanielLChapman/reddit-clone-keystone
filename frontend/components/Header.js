
import Meta from './Meta';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import SignOut from './Signout';
import { useUser } from './User';
import convertCommentCount from '../lib/convertCommentCount';
import { useState } from 'react';
import router from 'next/router';
import Search from './Search';


export default function Header(props) {
    const user = useUser();
    
    return (
    <div className="top-bear-container">
        <Meta />
        <div className="top-bar">
                <a href="/" className="website-icon">
                    <img src={`/icon.webp`} /><span>Reddit</span></a>
            <div className="search-bar-main">
                <Search />
            </div> 


            <section className="signin-login-dropdown">
                <label htmlFor="signin-login-window">
                    {
                        user ? <span className="signin-login-window-username">{user.username}</span> : <FontAwesomeIcon icon={faUserAlt} className="fa-user-alt " />
                    }
                    <span style={{top: '0px', position: 'relative'}}>
                    <FontAwesomeIcon icon={faArrowDown} className="fa-arrow-down " />
                    </span>
                </label>
                <input id="signin-login-window" type="checkbox" name="signin-login-window" />

                
                <div>
                    <ul>
                        {user && <li><a href={`/user/${user.username}`}>Profile</a></li>}

                        {user && (
                            <li>
                                <span style={{float: 'left'}}>Karma</span>  <span style={{float: 'right'}}>{convertCommentCount(  user.postVotes + user.commentVotes)}</span>
                                <br />
                            </li>
                        )}
    
                        {user && <li><a href={`/subreddits/create`}>Create Subreddit</a></li>}


                    </ul>
                    {!user && <button type="submit" className="signup-button" style={{top: '-1px'}}>
                            <Link href="/signin">Sign up</Link>
                        </button>}
                    
                        {!user ? <button className="dropdown-button"><Link href="/signin">Sign In</Link></button> : <SignOut /> }
                    
                </div>
            </section>
            
        </div>
    </div>
)

        }