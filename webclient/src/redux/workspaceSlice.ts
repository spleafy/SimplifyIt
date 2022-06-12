import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

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
      state.workspaces = action.payload;
    },
    pushWorkspace: (state: RootStateOrAny, action) => {
      state.workspaces = [...state.workspaces, action.payload];
    },
  },
});

/**
 * workspaceSlice actions
 * @description Exporting the deconstructed actions from the workspaceSlice
 */
export const { updateActiveWorkspace, updateWorkspaces, pushWorkspace } =
  workspaceSlice.actions;

/**
 * workspaceSlice reducer
 * @description Exporting the whole reducer from the workspaceSlice
 */
export default workspaceSlice.reducer;
