import React from 'react';
import Link from 'next/link';
import { useUser } from '../User';

function SubredditHomePage(props) {
    const user = useUser();
    return (
        <div>
            { user && (
                            <div>
                                <Link href={`/r/${props.slug}/submit`}>
                                    Create a Link Post
                                </Link>
                                <Link href={`/r/${props.slug}/submit?selftext=true`}>
                                    Create a Text Post
                                </Link>      
                            </div>
                        )
            }
        </div>
    );
}

export default SubredditHomePage;