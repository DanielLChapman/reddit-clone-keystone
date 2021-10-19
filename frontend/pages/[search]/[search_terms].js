import React from 'react';
import SearchPage from '../../components/SearchPage/SearchPage';

function SearchTermPage(props) {
    return (
        <div>
            <SearchPage query={props.query.search_terms} />
        </div>
    );
}

export default SearchTermPage;