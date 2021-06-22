import React from 'react';
import PropTypes from 'prop-types';


function checkURL(url) {
    let urlMatch =  (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    let urlIncludes = false;
    const substrings = ['jpg', 'jpeg', 'gif', 'png'];
    if (substrings.some(v => url.includes(v))) {
        urlIncludes = true;
    }
    return urlMatch || urlIncludes;
}

function MediaPost(props) {

    const getMediaCode = (inputURL) => {

        let isImage = checkURL(inputURL);
        if (isImage) {
            return <img src={inputURL} alt={props.post.title} />
        } else if(inputURL.includes('youtube')) {
                let video_id = beginning.split('v=')[1];
                let ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
                }
                return (<div className="small-post-youtube-media-container">
                            <iframe className="small-post-youtube-video" width="560" height="315" src={`https://www.youtube.com/embed/${video_id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            {inputURL}
                    </div>
                )
        } else {
            return <a href={inputURL}>{inputURL.substring(0, 20)}{inputURL.split('').length > 20 ? '...' : ''}</a>
        }
    }

    return (
        <div>
            <h4>{props?.post?.title}</h4>
            
            <section className="media-output-small-post">
                {getMediaCode(props?.post?.link)}
            </section>
            
        </div>
    );
}

MediaPost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default MediaPost;