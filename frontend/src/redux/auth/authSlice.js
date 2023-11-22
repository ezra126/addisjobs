import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  Google,
  updateUserBasicInfo,
  updateUserDetailInfo,
  registerEmployer,
  signinEmployer,
  updateEmployerInfo,
} from "./authAction";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  isEmployer: false,
  error: null,
  success: false,
  googlesuccess: false,
  isgooglesign: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setErrorToNull: (state) => {
      state.error = null;
    },
    setSuccessToFalse: (state) => {
      state.success = false;
    },
    setAccessToken: (state, action) => {
      state.userToken = action.payload;
    },
    setGoogleSuccessToFalse: (state) => {
      state.googlesuccess = false;
    },
    signout: (state) => {
      state.userInfo = {};
      state.isgooglesign = false;
      state.isEmployer = false;
      state.error = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true; // registration successful
        //  state.userInfo = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log(payload);
      })
      .addCase(registerEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true; // registration successful
        // state.userInfo = payload;
        // state.isEmployer = true;
      })
      .addCase(registerEmployer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.isgooglesign = false;
        state.userToken = localStorage.getItem("access_token");
        state.userInfo = payload.rest;
        console.log("sucess" + payload);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;

        console.log(payload);
      })
      .addCase(signinEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinEmployer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userInfo = payload.rest;
        state.isEmployer = true;
        console.log("sucess" + payload);
      })
      .addCase(signinEmployer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;

        console.log(payload);
      })
      .addCase(Google.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Google.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.googlesuccess = true;
        state.isgooglesign = true;
        state.userToken = localStorage.getItem("access_token");
        state.error = null;
        state.userInfo = payload;

        console.log("sucess" + payload);
        console.log("sucess" + localStorage.getItem("access_token"));
      })
      .addCase(Google.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;

        console.log(payload);
      })
      .addCase(updateUserBasicInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserBasicInfo.fulfilled, (state, { payload }) => {
        console.log("payload" + payload.rest);
        state.userInfo = payload.rest;
        state.loading = false;
        console.log("sucess" + payload);
      })
      .addCase(updateUserBasicInfo.rejected, (state, { payload }) => {
        state.loading = false;
        // state.error = payload;

        console.log(payload);
      })
      .addCase(updateEmployerInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployerInfo.fulfilled, (state, { payload }) => {
        console.log("payload" + payload.rest);
        state.userInfo = payload.rest;
        state.loading = false;
        state.success = true;
        console.log("sucess" + payload);
      })
      .addCase(updateEmployerInfo.rejected, (state, { payload }) => {
        state.loading = false;
        // state.error = payload;

        console.log(payload);
      })
      .addCase(updateUserDetailInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetailInfo.fulfilled, (state, { payload }) => {
        console.log("payload" + payload.rest);
        state.loading = false;
        state.userInfo = payload.rest;
        console.log("sucess" + payload);
      })
      .addCase(updateUserDetailInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;

        console.log(payload);
      });
  },
});

export const {
  setErrorToNull,
  setSuccessToFalse,
  setGoogleSuccessToFalse,
  setAccessToken,
  signout,
} = authSlice.actions;

export default authSlice.reducer;
