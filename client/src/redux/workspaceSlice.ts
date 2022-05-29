import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { WorkspaceType } from "../utils/types";

/**
 * Workspace slice
 * @description Exporting the workspaceSlice
 */
export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    active: {},
    workspaces: [],
  },
  reducers: {
    updateActiveWorkspace: (state: RootStateOrAny, action) => {
      state.active = action.payload;
    },
    updateWorkspaces: (state: RootStateOrAny, action) => {
      const workspaces = action.payload.filter(
        (workspace: WorkspaceType) => workspace._id !== state.active._id
      );
      workspaces.unshift(state.active);
      state.workspaces = workspaces;
    },
  },
});

/**
 * workspaceSlice actions
 * @description Exporting the deconstructed actions from the workspaceSlice
 */
export const { updateActiveWorkspace } = workspaceSlice.actions;

/**
 * workspaceSlice reducer
 * @description Exporting the whole reducer from the workspaceSlice
 */
export default workspaceSlice.reducer;
