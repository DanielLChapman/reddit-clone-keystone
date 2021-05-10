import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
          firstSignin
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SUBSCRIBE_TO_DEFAULTS = gql`
  mutation SUBSCRIBE_TO_DEFAULTS($id: ID!) {
    subscribeToDefault(id: $id) {
        id
        subreddits {
          id
          name
        }
    }
    
  } 
`;

function SignIn(props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [subscribe, {data: data2, loading: data3}] = useMutation(SUBSCRIBE_TO_DEFAULTS);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send email and password to graphql api
    const res = await signin();
    let firstSignin = res.data?.authenticateUserWithPassword?.item?.firstSignin;
    if (firstSignin == null || !firstSignin) {
      let resp = await subscribe({variables: {
        id: res.data.authenticateUserWithPassword.item.id
      }});
    }
    resetForm();
  };
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}

export default SignIn;
