import { configureStore } from '@reduxjs/toolkit';
import bugs from './bugs';
import projects from './projects';
import users from './users';
import logger from './middlreware/logger';
import func from './middlreware/func';
import toast from './middlreware/toast';

// @ts-expect-error
export default function makeStore() {
  return configureStore({
    reducer: {
      bugs,
      projects,
      users,
    },
    // @ts-expect-error
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      logger({ destination: 'console' }),
      func,
      toast,
    ],
  });
}

// @ts-expect-error
export type Store = ReturnType<typeof makeStore>;
export type State = ReturnType<Store['getState']>;
