import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

let lastId = 0;
const initialState: User[] = [];

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
