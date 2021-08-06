import React from 'react';
import { checkURL } from '../../SmallPosts/MediaPost';



function CommentsMedia(props) {
    const getMediaCode = (inputURL) => {

        let isImage = checkURL(inputURL);
        if (isImage) {
            return <img src={inputURL} alt={props.post.title} />
        } else if(inputURL.includes('youtube')) {
                let video_id = inputURL.split('v=')[1];
                let ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
                }
                return (
                <div>
                    <div className="small-post-youtube-media-container">
                            <iframe className="small-post-youtube-video" width="560" height="315" src={`https://www.youtube.com/embed/${video_id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            
                    </div>
                    <a href={inputURL}>{inputURL}</a>
                </div>
                )
        } else {
            return <a href={inputURL}>{inputURL.substring(0, 20)}{inputURL.split('').length > 20 ? '...' : ''}</a>
        }
    }


    return (
        <section className="comment-page-media">
            {getMediaCode(props?.post?.link)}
        </section>
    );
}

export default CommentsMedia;