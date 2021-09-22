import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
    $username: String!
    $case_username: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password, username: $username, case_username: $case_username }) {
      id
      name
      email
      subreddits {
        id
      }
    }
  }
`;


function SignUp(props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    username: '',
    name: '',
    case_username: '',
  });
  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send email and password to graphql api
    let variables = {
      email: inputs.email,
      password: inputs.password,
      username: inputs.username,
      name: inputs.name,
      case_username: inputs.username.toLowerCase()
    }

    
    const res = await signup({
      variables: {
        email: inputs.email,
        password: inputs.password,
        username: inputs.username,
        name: inputs.name,
        case_username: inputs.username.toLowerCase()
      }
    }).catch(console.log(error));
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <fieldset>
        {data?.createUser && (
          <p>
            Signed Up With {data.createUser.email} - Please Go Ahead And Sign In
          </p>
        )}
         <label htmlFor="name">
          Username
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
            value={inputs.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}

export default SignUp;
