import Link from 'next/link';
import Nav from './Nav';


export default function Header() {
  return (
    <>
      <div className="bar">
        <span>
          <Link href="/">App name</Link>
        </span>
        <Nav />
      </div>
    </>
  );
}
