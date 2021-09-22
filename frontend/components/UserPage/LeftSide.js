import React, { useState } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

function LeftSide(props) {
    return (
        <>
         {/*upvote, downvote and current score*/}
         <FaLongArrowAltUp className={`upvote-arrow ${props.upvoted? 'upvote-arrow-colored' : ''}`}   />
         <div onClick={async () => {
                if (props.user) {
             }
             
         }}></div>
         <br />
         <FaLongArrowAltDown className={`downvote-arrow ${props.downvoted ? 'downvote-arrow-colored' : ''}`} />
         <div onClick={async () => {
                if (props.user) {

                }
             }
             
         }></div>
         
        </>
    );
}

export default LeftSide;