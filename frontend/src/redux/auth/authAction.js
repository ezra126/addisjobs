import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./../../firebase";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetch("/api/auth/signup", {
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
      console.log("eroror");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetch("/api/auth/signin", {
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
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const Google = createAsyncThunk(
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

export const updateUserBasicInfo = createAsyncThunk(
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

export const updateUserDetailInfo = createAsyncThunk(
  "auth/updateUserDetailInfo",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      console.log("ifdfn d" + id);
      const data = await fetch(`/api/user/updatedetailinfo/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const body = await data.json();

      console.log(body);
      console.log("idn" + id);
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

export const registerEmployer = createAsyncThunk(
  "auth/registerEmployer",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetch("/api/auth/employersignup", {
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
      console.log("error");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signinEmployer = createAsyncThunk(
  "auth/signinEmployer",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetch("/api/auth/employersignin", {
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
      console.log("error");
      if (error.success === false) {
        return rejectWithValue(error.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateEmployerInfo = createAsyncThunk(
  "auth/updateEmployerInfo",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      console.log("ifdfn d" + id);
      const data = await fetch(`/api/employer/updateemployer/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const body = await data.json();

      console.log(body);
      console.log("idn" + id);
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
