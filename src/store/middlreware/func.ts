import { Store } from '@reduxjs/toolkit';

const func =
  ({ dispatch, getState }: Store) =>
  // @ts-expect-error
  (next) =>
  // @ts-expect-error
  (action) => {
    if (typeof action === 'function') action(dispatch, getState);
    else next(action);
  };

export default func;
