import { createSlice } from "@reduxjs/toolkit";

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    workspace: {},
  },
  reducers: {
    updateWorkspace: (state: any, action) => {
      state.workspace = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
