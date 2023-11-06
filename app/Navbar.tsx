import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex space-x-6 ">
      <Link href="/">Logo</Link>
      <ul className="flex space-x-6">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/issues">Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
