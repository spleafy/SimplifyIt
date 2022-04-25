import { createSlice } from "@reduxjs/toolkit";

/**
 * Workspace slice
 * @description Exporting the workspaceSlice
 */
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

/**
 * workspaceSlice actions
 * @description Exporting the deconstructed actions from the workspaceSlice
 */
export const { updateWorkspace } = workspaceSlice.actions;

/**
 * workspaceSlice reducer
 * @description Exporting the whole reducer from the workspaceSlice
 */
export default workspaceSlice.reducer;
