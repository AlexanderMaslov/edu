import { Theme } from '@radix-ui/themes';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from '../providers/CartProvider';
import { Toaster } from 'react-hot-toast';

export const TestProviders = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return (
    <CartProvider>
      <Theme>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </Theme>
      <Toaster />
    </CartProvider>
  );
};
