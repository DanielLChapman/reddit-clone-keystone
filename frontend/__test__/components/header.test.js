import { render, screen } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import Header from '../../components/Header';


describe('It insures the header contains the necessary information', () => {
    it('has a logo, search bar, and dropdown menu', () => {
        const { container, debug } = render(
            <MockedProvider >
              <Header />
            </MockedProvider>
          );

          expect(container).toMatchSnapshot();
    })
})