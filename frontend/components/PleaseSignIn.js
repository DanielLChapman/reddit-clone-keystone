import React from 'react';
import { useUser } from './User';
import SignIn from './Signin';

function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}

export default PleaseSignIn;
