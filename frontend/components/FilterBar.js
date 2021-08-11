import React, { Component } from 'react';
import { FaHotjar, FaBahai, FaGopuram, FaChartLine} from 'react-icons/fa';



class FilterBar extends Component {
    constructor(props) {
        super(props);
    }

    toggleClass = (num) => {
        let state = {
            li1: false,
            li2: false,
            li3: false,
            li4: false
        };
        state['li'+num] = true;
        this.props.setFilterState({...state});
    }

    render() {
        let style = {
            display: "none"
        };
        if (this.props.filterState.li3) {
            /*style= {
                display: "inline-block"
            };*/
        }
        return (
            <section className="filter-bar"> 
                <h5>Popular Posts</h5>
                <ul>
                    <li className={this.props.filterState.li1 ? 'active' : null} onClick={() => this.toggleClass(1)}><FaHotjar /> Hot</li>
                    <li className={this.props.filterState.li2 ? 'active' : null} onClick={() => this.toggleClass(2)}><FaBahai /> New</li>
                    <li className={this.props.filterState.li3 ? 'active' : null} onClick={() => this.toggleClass(3)}><FaGopuram /> Top</li>
                    <li className="time-selector-for-filter-bar" style={style}>Today</li>
                    <li className={this.props.filterState.li4 ? 'active' : null} onClick={() => this.toggleClass(4)}><FaChartLine /> Rising</li>
                </ul>
            </section>
        );
    }
}

export default FilterBar;