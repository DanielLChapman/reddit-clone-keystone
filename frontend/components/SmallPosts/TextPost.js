import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function TextPost(props) {
    let afterClass = "";
    if (props?.post?.content.split('').length > 550) {
        afterClass = "use-after"
    }
    if (props?.post?.link !== '') {
        return (
            <>
                <h4>{props?.post?.title.split('').length > 100 ? props?.post?.title.split('').splice(0,100).join('') + "..." : props?.post?.title}</h4>
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
                <span><ReactMarkdown>{props?.post?.content.split('').length > 200 ? props?.post?.content.split('').splice(0,200).join('') + "..." : props?.post?.content}</ReactMarkdown></span>
            </section>
        </>
    );

}

TextPost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default TextPost;
