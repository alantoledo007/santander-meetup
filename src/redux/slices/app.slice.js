import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_STATES } from "src/core/constants";

const initialState = {
  isAdmin: ADMIN_STATES.NOT_KNOW,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = app.actions;

export default app.reducer;
