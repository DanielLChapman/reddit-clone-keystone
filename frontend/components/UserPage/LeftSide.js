import React, { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

function LeftSide(props) {
    return (
        <>
         {/*upvote, downvote and current score*/}
         <div><FaLongArrowAltUp className={`upvote-arrow ${props.upvoted? 'upvote-arrow-colored' : ''}`}   /></div>
         <div>
         <FaLongArrowAltDown className={`downvote-arrow ${props.downvoted ? 'downvote-arrow-colored' : ''}`} />
         </div>
        </>
    );
}

export default LeftSide;