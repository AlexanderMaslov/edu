import { configureStore } from '@reduxjs/toolkit';
import bugs from './bugs';
import projects from './projects';
import users from './users';

export default function makeStore() {
  return configureStore({
    reducer: {
      bugs,
      projects,
      users,
    },
  });
}

export type Store = ReturnType<typeof makeStore>;
export type State = ReturnType<Store['getState']>;
