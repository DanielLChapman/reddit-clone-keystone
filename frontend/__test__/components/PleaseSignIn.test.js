import { act, render, screen } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import Header from '../../components/Header';
import { signedInMocks, signedInMocksWithPosts } from '../helpers/generalMocks';
import PleaseSignIn from '../../components/PleaseSignIn';

describe('Runs a test if the user is signed in or not', () => {
    it ('It renders a login page if the user is not signed in', async () => {
        const { container, debug } = render(
            <MockedProvider >
              <PleaseSignIn>
                  <span>Hi</span>
              </PleaseSignIn>
            </MockedProvider>
          );

          await screen.findByText(
            'Sign Into Your Account'
          );

        expect(container).toMatchSnapshot();
    });

    it ('It renders a span with text Hi if logged in', async () => {
        const { container, debug } = render(
            <MockedProvider mocks={signedInMocks}>
              <PleaseSignIn>
                  <span>Hi</span>
              </PleaseSignIn>
            </MockedProvider>
          );

          await screen.findByText(
            'Hi'
          );

        expect(container).toMatchSnapshot();
    });
})