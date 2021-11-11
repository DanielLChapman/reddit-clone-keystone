import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import Signup, { SIGNUP_MUTATION } from '../../components/SignUp';
import { CURRENT_USER_QUERY } from '../../components/User';
import { fakeUser } from '../../lib/testUtils';
import { act } from 'react-dom/test-utils';

const me = fakeUser();

const password = 'wesswess1';


const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        username: me.username,
        case_username: me.username.toLowerCase(),
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock
  // {
  //   request: { query: CURRENT_USER_QUERY },
  //   result: { data: { authenticatedItem: me } },
  // },
];

describe('<SignUp/>', () => {
    
  it('render and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText('Name'), me.name);
    await userEvent.type(screen.getByPlaceholderText('Username'), me.username);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    // Click the submit
    await userEvent.click(screen.getByText('Sign Up'));
    await screen.findByTestId('success-signup-message');

  });

  it('calls the mutation with errors', async () => {
    const { container, debug } = render(
        <MockedProvider mocks={mocks}>
          <Signup />
        </MockedProvider>
      );
      // Type into the boxes
      await userEvent.type(screen.getByPlaceholderText('Name'), me.name);
      await userEvent.type(screen.getByPlaceholderText('Username'), me.username);
      await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
      await userEvent.type(screen.getByPlaceholderText(/password/i), 'test');

      await userEvent.click(screen.getByText('Sign Up'));
      await screen.findByText(
        'Password required to be a minimum of 8 characters'
      );
  })

});