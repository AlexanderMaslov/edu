import { createSlice } from '@reduxjs/toolkit';

interface Project {
  id: number;
  name: string;
}

let lastId = 0;
const initialState: Project[] = [];

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
