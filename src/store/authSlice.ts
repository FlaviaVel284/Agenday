import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userName: string | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  userName: null,
  userEmail: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    setUserLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
    },
  },
});

export default userSlice.reducer;

export const { setActiveUser, setUserLogOut } = userSlice.actions;
