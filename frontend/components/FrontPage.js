import Link from 'next/link';
import React from 'react';
import { useUser } from './User';

function FrontPage(props) {
    const user = useUser();
    return (
        <div>
            {user && (
                <Link href="/subreddits/create">Create Your Own Subreddit</Link>
            )}
            
        </div>
    );
}

export default FrontPage;