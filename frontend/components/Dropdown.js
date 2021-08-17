import React, { useState } from 'react';
import PropTypes from 'prop-types'

function Dropdown(props) {
    /*
        let options = ['Hot', 'Best', 'New', 'Top', 'Rising'];
        const [dropValue, setDropValue] = useState('Hot');
        <Dropdown returnFunc={setDropValue} selected={dropValue} options={options} />    
    */
    return (
        <select value={props.selected} onChange={(e) => {
            props.returnFunc(e.target.value);
        }}>
            {
                props.options && props.options.map((x, i) => (
                    <option key={i} value={x}>{x}</option>
                ))
            }
        </select>
    );
}

Dropdown.propTypes = {
    returnFunc: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
};
  

export default Dropdown;