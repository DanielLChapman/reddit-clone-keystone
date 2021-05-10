import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

function SignOut() {
  const [signout, { data, error, loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        signout();
        Router.push({
          pathname: `/`,
        });
      }}
    >
      Sign Out
    </button>
  );
}

export default SignOut;
