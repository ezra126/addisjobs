import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async ({ employerId }, { rejectWithValue }) => {
    console.log("is" + employerId);
    try {
      const data = await fetch(`/api/employer/getallposts/${employerId}`, {
        method: "GET",
      });

      // const data = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      const body = await data.json();
      console.log(body);
      if (body.success === false) {
        return rejectWithValue(body.message);
      }
      return body;
    } catch (error) {
      console.log("eroror");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async ({ formData, id }, { rejectWithValue }) => {
    console.log("hollll add new post" + formData.job_title);
    console.log("id" + id);
    try {
      const data = await fetch(`/api/employer/postjob/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const body = await data.json();
      console.log(body);
      if (body.success === false) {
        return rejectWithValue(body.message);
      }
      return body;
    } catch (error) {
      console.log("eroro" + error);
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetch(`/api/employer/getpost/${id}`, {
        method: "GET",
      });
      const body = await data.json();
      console.log(body);
      if (body.success === false) {
        return rejectWithValue(body.message);
      }
      return body;
    } catch (error) {
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePost = createAsyncThunk(
  "auth/Google",
  async (type, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const data = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const body = await data.json();
      console.log(body);
      if (body.success === false) {
        return rejectWithValue(body.message);
      }
      return body;
    } catch (error) {
      console.log("error");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchPostbyFilter = createAsyncThunk(
  "auth/updateUserBasicInfo",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const data = await fetch(`/api/user/updatebasicinfo/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const body = await data.json();

      console.log(body);
      console.log("idn" + id + formData.first_name);
      if (body.success === false) {
        return rejectWithValue(body.message);
      }
      console.log("jnjbjhbdjhb");
      return body;
    } catch (error) {
      console.log("error");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
