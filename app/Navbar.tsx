'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

interface Props {
  user?: Session['user'];
}

const Navbar = ({ user }: Props) => {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="mb-5 border-b px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames(
                      'transition-colors hover:text-zinc-800 ',
                      {
                        'text-zinc-500': link.href !== pathname,
                        'text-zinc-900': link.href === pathname,
                      },
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {user && <Link href="/api/auth/signout">Log out</Link>}
            {!user && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
