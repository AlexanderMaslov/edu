import React, { PropsWithChildren } from 'react';
import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

export const Link = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink {...props} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};
