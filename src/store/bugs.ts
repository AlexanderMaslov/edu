import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { State } from './configureStore';

interface Bug {
  id: number;
  description: string;
  resolved: boolean;
  userId?: number;
}

let lastId = 0;
const initialState: Bug[] = [];

const slice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

export const getUnResolvedBugs = createSelector(
  [(state: State) => state.bugs],
  (bugs) => bugs.filter((bug) => !bug.resolved),
);

export const getBugsByUser = (userId: number) =>
  createSelector(
    (state: State) => state.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId),
  );
