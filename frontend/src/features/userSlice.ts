import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../types/user.type";

interface UserState {
  users: User[];
  currentUser: number;
}

const initialState: UserState = {
  users: [],
  currentUser: -1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<number>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, setCurrentUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
