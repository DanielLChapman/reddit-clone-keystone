import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import bestMatch from '../lib/getEditDistance';


const SEARCH_QUERY = gql`
    query SEARCH_QUERY($searchTerm: String!) {
        allSubreddits(
            where: 
                    {name_contains_i: $searchTerm},
        ) {
            id
            title
            subscriber {
                id
            }
            slug
            name
        },
    }
`;

function Search(props) {
    const router = useRouter();

    const [findItems, {loading, data, error}] = useLazyQuery(SEARCH_QUERY, {
        fetchPolicy: 'no-cache'
    });

    const findItemsDebounced = debounce(findItems, 350);

    resetIdCounter();

    const DropDown = styled.div`
        border:1px solid black;
        background: white;
        width: 91.5%;
        left: 38px;
        top:55px;
        position:absolute;
    `;

    const DropDownItem = styled.div`

    `;

    const items = data?.allSubreddits || [];

    const { inputValue, getMenuProps, getInputProps, getComboboxProps,isOpen, highlightedIndex ,getItemProps} = useCombobox({
        items,
        onInputValueChange() {
            findItemsDebounced({
                variables: {
                    searchTerm: inputValue
                }
            })
        },
        onSelectedItemChange({selectedItem}) {
            console.log('here')
            router.push(`/r/${selectedItem.slug}`);
        },
        itemToString: (item) => item?.name || '',
    });

    
    //sort by most accurate

    let sortedItems = bestMatch(items, inputValue, 'title').reverse();

    //get top 5
    if (sortedItems.length > 5) {
        sortedItems = sortedItems.slice(0, 5);
    }

    return (
        <div className="search">
            <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
            </button>
            <div  {...getComboboxProps()} >
                <input {...getInputProps({
                    type: 'search',
                    placeholder: 'Search',
                    id: 'search',
                    className:'searchTerm'
                    
                })} 
                />
                {/*<input type="text" className="searchTerm" value={search} placeholder="Search" onChange={(e) => {
                    updateSearch(e.target.value);
                }} />*/}
            </div>
            
            <DropDown {...getMenuProps()}>
                {isOpen && 
                    sortedItems.map((item, index) => (
                            <DropDownItem
                                {...getItemProps({ item, index })}
                                key={item.id}
                                highlighted={index === highlightedIndex}
                            >
                                {item.name}
                            </DropDownItem>
                    )
                        
                    )
                }
                {isOpen && !items.length && !loading && (
                    <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
                )}
            </DropDown>
            
        </div>
    );
}

export default Search;