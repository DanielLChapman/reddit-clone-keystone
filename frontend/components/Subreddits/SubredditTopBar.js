import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../User';
import {SUBSCRIBE_TO_SUBREDDIT, UNSUBSCRIBE_TO_SUBREDDIT} from './SubredditPage';
import { useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.updateUser));
}

function SubredditTopBar(props) {
    const user = useUser();
    const [subscribe, {data:subscribeData, error: subscribeError, loading: subscribeLoading}] = useMutation(SUBSCRIBE_TO_SUBREDDIT, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        update
    });
    
    const [unsubscribe, {data:unSubscribeData, error: unSubscribeError, loading: unSubscribeLoading}] = useMutation(UNSUBSCRIBE_TO_SUBREDDIT, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        update
    })

    return (
        <>
            {
                props.type === 'Home' && (
                    <section className="subreddit-top-bar">
                        <section className="subreddit-top-bar-content">
                            <section className="subreddit-top-bar-name">
                                <h1>{props.subreddit.name}</h1>
                                <button onClick={ async () => {
                                    if (user) {
                                        let subscribed = user.subreddits.some((x) => {
                                            return x.id === props.subreddit.id
                                        })  
    
                                        subscribed ? await unsubscribe({
                                            variables: {
                                                id: user.id,
                                                subreddit_id: props.subreddit.id,
                                            }
                                        }) : await subscribe({ variables: {
                                            id: user.id,
                                            subreddit_id: props.subreddit.id,
                                        }})
                                    } else {
                                        alert('You must be signed in!');
                                    }
                                    
                                }
                                    
                                }>{user?.subreddits.some((x) => {
                                    return x.id === props.subreddit.id
                                }) ? 'Leave' : 'Join'}</button>
                            </section>
                            <span>
                                r/{props.slug}
                            </span>
                        </section>
                        
                    </section>
                )
            }
        </>
    );

}

SubredditTopBar.propTypes = {
    type: PropTypes.string.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    slug: PropTypes.string,
    subreddit: PropTypes.object.isRequired,

}

export default SubredditTopBar;