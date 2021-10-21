import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import capitalize from '../lib/capitalize';
import bestMatch from '../lib/getEditDistance';
import { DropDown, DropDownItem } from './styles/Dropdown';


const SEARCH_QUERY = gql`
    query SEARCH_QUERY($searchTerm: String!) {
        getSearchResults(
            searchTerm: $searchTerm,
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

    let items = data?.getSearchResults || [];
    //sort by most accurate


    const { inputValue, getMenuProps, getInputProps, getComboboxProps,isOpen, highlightedIndex ,getItemProps, selectedItem} = useCombobox({
        items,
        onInputValueChange() {
            findItemsDebounced({
                variables: {
                    searchTerm: inputValue
                }
            });
            
        },
        onSelectedItemChange({selectedItem}) {
            router.push(`/r/${selectedItem.slug}`);
        },
        itemToString: (item) => item?.name || '',
    });

    

    return (
        <div className="search">
            <button type="submit" className="searchButton" onClick={(e) => {
                router.push(`/search/${inputValue}`)
            }}>
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
            
            <DropDown {...getMenuProps()} className={`dropdown-window ${isOpen ? 'dropdown-opened':'dropdown-not-opened'}`}>
                {isOpen && 
                    items.map((item, index) => {

                        return (
                            <DropDownItem
                                {...getItemProps({ item, index })}
                                key={item.id}
                                highlighted={index === highlightedIndex}
                            >
                                r/{capitalize( item.slug)}
                            </DropDownItem>
                    )}
                        
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