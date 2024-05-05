import { configureStore } from '@reduxjs/toolkit';
import bugs from './bugs';
import projects from './projects';
import users from './users';
import logger from './middlreware/logger';
import toast from './middlreware/toast';
import api from './middlreware/api';

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
      toast,
      api,
    ],
  });
}

// @ts-expect-error
export type Store = ReturnType<typeof makeStore>;
// @ts-ignore
export type State = ReturnType<Store['getState']>;

export const store = makeStore();
