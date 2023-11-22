import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, fetchPost, addNewPost } from "./postAction";

const initialState = {
  loading: false,
  posts: [],
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    setErrorToNull: (state) => {
      state.error = null;
    },
    setSuccessToFalse: (state) => {
      state.success = false;
    },
    setDefault: (state) => {
      state.success = false;
      (state.loading = false), (state.posts = []), (state.error = null);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // console.log("success" + payload.rest);
        //post added succesfully
      })
      .addCase(addNewPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log(payload);
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.posts = payload.posts;
      })
      .addCase(fetchAllPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log(payload);
      });
    // .addCase(fetchPost.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchPost.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = null;
    //   // state.posts = payload.posts;
    // })
    // .addCase(fetchPost.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    //   console.log(payload);
    // })
  },
});

export const { setErrorToNull, setSuccessToFalse, setDefault } =
  postSlice.actions;

export default postSlice.reducer;
