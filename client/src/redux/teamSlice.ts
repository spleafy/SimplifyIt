import { createSlice } from "@reduxjs/toolkit";

/**
 * Team slice
 * @description Exporting the TeamsSlice
 */
export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
  },
  reducers: {
    updateTeams: (state, action) => {
      state.teams = action.payload;
    },
    pushTeam: (state: any, action) => {
      state.teams = [...state.teams, action.payload];
    },
    removeTeam: (state, action) => {
      state.teams = state.teams.filter(
        (success: any) => success.id !== action.payload
      );
    },
  },
});

/**
 * TeamSlice actions
 * @description Exporting the deconstructed actions from the TeamsSlice
 */
export const { updateTeams, pushTeam, removeTeam } = teamSlice.actions;

/**
 * TeamSlice reducer
 * @description Exporting the whole reducer from the TeamsSlice
 */
export default teamSlice.reducer;
