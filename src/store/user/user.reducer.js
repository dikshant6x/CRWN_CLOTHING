// import { setCurrentUser } from "./user.action";
// import { USER_ACTION_TYPES } from "./user.types";
import { createSlice } from "@reduxjs/toolkit"; // takes place of reducer werite
const INITIAL_STATE = {
  currentUser: null,
  test: [1, 2, 3],
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions; // property that has all actions we wrote in reducer above

export const userReducer = userSlice.reducer; // gets us actual reducer function

// HERE WE SEE createSlice has replaced our reducer for user ; actions for user ; and types for user all here in one than 3 scripts
