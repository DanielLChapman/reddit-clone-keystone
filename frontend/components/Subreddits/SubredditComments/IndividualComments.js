import Link from 'next/link';
import React from 'react';

function IndividualComments(props) {
    console.log(props.comment.descendents);
    if (props.count > 5) {
        return <Link href="#" className="continue-this-thread"><a>Continue this thread...</a></Link>
    }
    return (
        <div className={`comments-indent-${props.count}`}> 
            {props.comment.content}
            {props.comment.descendents.map((x) => {
                //need to sort descenents first
                return <IndividualComments comment={x} count={props.count + 1} />
            })}
        </div>
    );
}

export default IndividualComments;