import React from 'react';
import PropTypes from 'prop-types';

function TextPost(props) {
    let afterClass = "";
    if (props?.post?.content.split('').length > 550) {
        afterClass = "use-after"
    }
    if (props?.post?.link !== '') {
        return (
            <>
                <h4>{props?.post?.title}</h4>
                <section className={`reddit-post-right-bottom-description ${afterClass}`} >
                    <a href={props?.post?.link}>{
                        props?.post?.link.split('').length > 100 ? props?.post?.link.split('').splice(0,100).join('') + "..." : props?.post?.link
                    }</a>
                </section>
                
            </>
        )
    }
    return (
        <>
            <h4>{props?.post?.title}</h4>
            <section className={`reddit-post-right-bottom-description ${afterClass}`} >
                <span>{props.post.content}</span>
            </section>
        </>
    );

}

TextPost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default TextPost;