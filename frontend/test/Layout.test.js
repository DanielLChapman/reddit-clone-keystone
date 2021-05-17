import React from 'react';
import { render } from '@testing-library/react';
import wait from 'waait';
import Page from '../components/Page';
import { shallow, mount } from 'enzyme';

const can = {
    name: 'pamplemousse',
    ounces: 12,
};

describe('tests the layout to make sure the required classes are there', () => {
    /*it('fails', () => {
        expect(true).toBeFalsy();
        done();
    })*/
    it ('checks the homepage header', () => {

        const wrapper = mount(<Page />);

        //layout

        //Homepage


        //Header
        //signed out
        //top-bar
        let container = wrapper.find('.top-bar');
        expect(container.length).toBe(1);
        expect(container.find('.website-icon').length).toBe(1);
        expect(container.find('.search-bar-main').length).toBe(1);
        expect(container.find('.login-button').length).toBe(1);
        expect(container.find('.signup-button').length).toBe(1);
        expect(container.find('.signin-login-dropdown').length).toBe(1);
        expect(container.find('.signin-login-dropdown').find('label').length).toBe(1);
        expect(container.find('FontAwesomeIcon').length).toBe(2);
        expect(container.find('.dropdown-button').length).toBe(1);

    })
    
    //login page popup
    

    //top navigation signed in
    //should have 'Reddit' 'Dropdown menu' 'search bar' 'popular' 'messages' 'account info'



    // Middle homepage
    // Nothing
    

    //Bottom Nav
    //Should have 'Hot' 'New' 'Top' 'Rising' and customizable ones
    it ('checks the homepage main content', () => {
        const wrapper = mount(<Page />);
        let container = wrapper.find('main');
        expect(container.find('.filter-bar').length).toBe(1);
        let filterBar = container.find('.filter-bar');
        expect(filterBar.find('li').length).toBe(5);
        expect(filterBar.find('.active').length).toBe(1);
        filterBar.find('li').at(4).simulate('click');

        wrapper.update();
        container = wrapper.find('main');
        filterBar = container.find('.filter-bar');
        let objectToTest = filterBar.find('.active');
        expect(objectToTest).toMatchObject(filterBar.find('li').at(4));
    })


    //Should have Main
    //Should have left and right classes

    //Left should have submissions in paginatio

    //Submissions
    //Should have upvote, downvote and count on the left
    //On the right should have subreddit name, posted by who and how long ago, awards in a title
    //Middle of right should have title and link to either the post or outside link
    //bottom should have comments, share, and save

    //Subreddit
    //Middle subreddit
    // Subreddit tag, title, button to click join or leave if signed in
    
    //Main
    //Should have Left, Right

})
