import { render as baseRender } from '@testing-library/react';
import { TestProviders } from './TestProviders';

function render(...args: Parameters<typeof baseRender>) {
  return baseRender(args[0], { ...args[1], wrapper: TestProviders });
}

export * from '@testing-library/react';

export { render };
