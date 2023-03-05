import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import authApiSlice from "./apislices/authapislices";

export type UserType = {
  account_added: boolean;
  details: {
    about: string;
    contact: string;
    coords: string;
    employee_count: number;
    end_time: string;
    id: number;
    image: string;
    location: string;
    start_time: string;
  };
  services_added: boolean;
  token: null;
  user: { email: string; id: number; username: string };
  verified: string;
};

export const authAdapter = createEntityAdapter({
  selectId: (user: UserType) => user.user.id,
});

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: authAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        authAdapter.setAll(state, [action.payload]);
      }
    );
  },
});

export const { selectAll: authDetails } = authAdapter.getSelectors(
  (state: any) => state.authSlice
);

export const { reducer: authReducer } = AuthSlice;
