import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import capitalize from '../lib/capitalize';
import bestMatch from '../lib/getEditDistance';


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

    const DropDown = styled.div`
        border:1px solid black;
        background: white;
        width: 91.5%;
        left: 38px;
        top:55px;
        position:absolute;
    `;

    const DropDownItem = styled.div`
        border-bottom: 1px solid lightgray;
        background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
        padding: .5rem;
        transition: all 0.2s;
        ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
        display: flex;
        align-items: center;
        font-size: .95rem;
        border-left: 10px solid
        ${(props) => (props.highlighted ? 'lightgray' : 'white')};
  `;

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
                    items.map((item, index) => {

                        return (
                            <DropDownItem
                                {...getItemProps({ item, index })}
                                key={item.id}
                                highlighted={index === highlightedIndex}
                            >
                                {capitalize( item.slug)}
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