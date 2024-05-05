import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { State } from './configureStore';
import { apiCallBegan } from './api';

export interface Bug {
  id: number;
  description: string;
  resolved?: boolean;
  userId?: number;
}

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [] as Bug[],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugAdded: ({ list }, action) => {
      list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugsReceived: (bugs, action) => {
      console.log('action: ', action.payload);
      bugs.list = action.payload;
    },
  },
});

export const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived } =
  slice.actions;
export default slice.reducer;

const url = '/api/bugs';

export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugsReceived.type,
  });

export const getUnResolvedBugs = createSelector(
  (state: State) => state.bugs.list,
  (bugs: Bug[]) => bugs.filter((bug) => !bug.resolved),
);

export const getBugsByUser = (userId: number) =>
  createSelector(
    (state: State) => state.bugs.list,
    (bugs: Bug[]) => bugs.filter((bug) => bug.userId === userId),
  );
