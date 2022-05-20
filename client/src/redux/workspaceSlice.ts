import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

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
    updateWorkspace: (state: RootStateOrAny, action) => {
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
