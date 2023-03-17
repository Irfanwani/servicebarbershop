import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import authApiSlice from "./apislices/authapislices";
import { detailsApiSlice } from "./apislices/detailsapislice";
import { mainApiSlice } from "./apislices/mainapislices";

export type UserType = {
  id?: number;
  account_added?: boolean;
  details?: Details;
  services_added?: boolean;
  token?: null;
  user?: { email: string; id: number; username: string };
  verified?: string;
};

export type Details = {
  about: string;
  contact: string;
  coords: any;
  employee_count: number | string;
  end_time: string;
  id: number;
  image: string;
  location: string;
  start_time: string;
  service_type: string;
};

export const authAdapter = createEntityAdapter({
  selectId: () => 0,
});

let initialState = {
  entities: {
    0: {},
  },
  ids: [0],
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    logoutaction: (state) => {
      authAdapter.setAll(state, [initialState]);
    },
  },
  extraReducers: (builder) => {
    const setAuthState = (state: any, action: any) => {
      authAdapter.setAll(state, [action.payload]);
    };

    const updateState = (state: any, action: any) => {
      authAdapter.upsertOne(state, { id: 0, ...action.payload });
    };
    builder
      .addMatcher(authApiSlice.endpoints.login.matchFulfilled, setAuthState)
      .addMatcher(authApiSlice.endpoints.register.matchFulfilled, setAuthState)
      .addMatcher(
        authApiSlice.endpoints.resetpassword.matchFulfilled,
        setAuthState
      )
      .addMatcher(
        authApiSlice.endpoints.verifyemail.matchFulfilled,
        updateState
      )
      .addMatcher(
        detailsApiSlice.endpoints.addgeneraldetails.matchFulfilled,
        updateState
      )
      .addMatcher(
        detailsApiSlice.endpoints.addbankdetails.matchFulfilled,
        updateState
      )
      .addMatcher(
        detailsApiSlice.endpoints.addserviceDetails.matchFulfilled,
        updateState
      );
  },
});

export const authDetails = (state: any) =>
  authAdapter
    .getSelectors((state: any) => state.authSlice)
    .selectById(state, 0);

export const { logoutaction } = AuthSlice.actions;

export const { reducer: authReducer } = AuthSlice;
