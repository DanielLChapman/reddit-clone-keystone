import React, { Component } from 'react';
import { FaHotjar, FaBahai, FaGopuram, FaChartLine} from 'react-icons/fa';
import Dropdown from './Dropdown';



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
        let options = ['Best', 'New', 'Top', 'Hot'];
        return (
            <>
                <section className="filter-bar"> 
                    <h5>{this.props.filterState} Posts</h5>
                    <ul>
                        <li data-testid="best-filter-bar" aria-disabled={this.props.filterState === 'Best'} className={this.props.filterState === 'Best' ? 'active' : null} onClick={() => this.props.setFilterState('Best')}><FaHotjar /> Best</li>
                        <li aria-disabled={this.props.filterState === 'New'} className={this.props.filterState === 'New' ? 'active' : null} onClick={() => this.props.setFilterState('New')}><FaBahai /> New</li>
                        <li data-testid="top-filter-bar" aria-disabled={this.props.filterState === 'Top'} className={this.props.filterState === 'Top' ? 'active' : null} onClick={() => this.props.setFilterState('Top')}><FaGopuram /> Top</li>
                        <li className="time-selector-for-filter-bar" style={style}>Today</li>
                        <li aria-disabled={this.props.filterState === 'Hot'} className={this.props.filterState === 'Hot' ? 'active' : null} onClick={() => this.props.setFilterState('Hot')}><FaChartLine /> Hot</li>
                    </ul>
                </section>
                <div className="filter-dropdown">
                    <Dropdown returnFunc={this.props.setFilterState} selected={this.props.filterState} options={options} />
                </div>
            </>
        );
    }
}

export default FilterBar;