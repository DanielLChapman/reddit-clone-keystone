import { act, render, screen } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import Header from '../../components/Header';
import { signedInMocks, signedInMocksWithPosts } from '../helpers/generalMocks';
import wait from 'waait';


describe('It insures the header contains the necessary information', () => {
    it('has a logo, search bar, and dropdown menu', () => {
        const { container, debug } = render(
            <MockedProvider >
              <Header />
            </MockedProvider>
          );

          expect(container).toMatchSnapshot();
    });

    it ('renders a different drop down when logged in ', async () => {
        const { container: container2, debug: debug2 } = render(
            <MockedProvider >
              <Header />
            </MockedProvider>
          );
        const { container, debug} = render(
            <MockedProvider mocks={signedInMocks}>
                <Header />
            </MockedProvider>
        );

        
        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        })

        expect(container).toMatchSnapshot();
        expect(container).not.toBe(container2);

    })
})