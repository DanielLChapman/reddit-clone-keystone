import React, { Component } from 'react';
import { FaHotjar, FaBahai, FaGopuram, FaChartLine} from 'react-icons/fa';



class FilterBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            display: "none"
        };
        if (this.props.filterState === 'Top') {
            /*style= {
                display: "inline-block"
            };*/
        }
        return (
            <section className="filter-bar"> 
                <h5>{this.props.filterState} Posts</h5>
                <ul>
                    <li aria-disabled={this.props.filterState === 'Best'} className={this.props.filterState === 'Best' ? 'active' : null} onClick={() => this.props.setFilterState('Best')}><FaHotjar /> Best</li>
                    <li aria-disabled={this.props.filterState === 'New'} className={this.props.filterState === 'New' ? 'active' : null} onClick={() => this.props.setFilterState('New')}><FaBahai /> New</li>
                    <li aria-disabled={this.props.filterState === 'Top'} className={this.props.filterState === 'Top' ? 'active' : null} onClick={() => this.props.setFilterState('Top')}><FaGopuram /> Top</li>
                    <li className="time-selector-for-filter-bar" style={style}>Today</li>
                    <li aria-disabled={this.props.filterState === 'Hot'} className={this.props.filterState === 'Hot' ? 'active' : null} onClick={() => this.props.setFilterState('Hot')}><FaChartLine /> Hot</li>
                </ul>
            </section>
        );
    }
}

export default FilterBar;