import { configureStore } from '@reduxjs/toolkit';
import bugs from './bugs';
import projects from './projects';

export default function makeStore() {
  return configureStore({
    reducer: {
      bugs,
      projects,
    },
  });
}
