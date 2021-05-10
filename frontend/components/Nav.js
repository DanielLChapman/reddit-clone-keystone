import Link from 'next/link';
import SignOut from './Signout';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  return (
    <nav>
      {user && (
        <>
          <Link href="/account">Accounts</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
}
