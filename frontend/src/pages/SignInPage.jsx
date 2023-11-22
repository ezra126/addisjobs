import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, Google } from "../redux/auth/authAction";
import {
  setErrorToNull,
  setSuccessToFalse,
  setGoogleSuccessToFalse,
} from "../redux/auth/authSlice";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error, success, googlesuccess } = useSelector(
    (state) => state.auth
  );
  // const provider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    success
      ? toast("user login successfully", {
          position: toast.POSITION.TOP_CENTER,
        })
      : "";
    error
      ? toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        })
      : "";
  }, [error, success]);

  useEffect(() => {
    if (error) {
      dispatch(setErrorToNull());
    }
  }, [error]);

  useEffect(() => {
    if (googlesuccess) {
      navigate("/");

      dispatch(setGoogleSuccessToFalse());
    }
  }, [googlesuccess]);

  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(setSuccessToFalse());
    }
  }, [success]);

  const handleGoogleSignin = async () => {
    dispatch(Google());
    // const auth = getAuth(app);
    // try {
    //   const result = await signInWithPopup(auth, provider);

    //   const res = await fetch("/api/auth/google", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: result.user.displayName,
    //       email: result.user.email,
    //       photo: result.user.photoURL,
    //     }),
    //   });

    //   const data = await res.json();
    //   navigate("/");

    //   console.log(data);
    // } catch (error) {
    //   toast.error("couldn't  signin in with google");
    // }
  };

  const onSubmit = async (formdata) => {
    dispatch(loginUser(formdata));

    // setLoading(true);
    // console.log(formdata);
    // await fetch("/api/auth/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formdata),
    // })
    //   .then(async (res) => {
    //     console.log(res);
    //     const data = await res.json();
    //     console.log(data);
    //     if (data.success === false) {
    //       setLoading(false);
    //       toast.error(data.message, {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       return;
    //     }
    //     toast("Signin success", { position: toast.POSITION.TOP_CENTER });
    //     setTimeout(() => {
    //       setLoading("false");
    //       navigate("/");
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //   });
  };

  return (
    <div className="flex md:flex-row flex-col sm:h-5/6 shadow-md ">
      <div
        id="sign-in-description"
        className="bg-gradient-to-r from-gray-900 to-gray-700 md:w-1/2 text-white pt-40 px-10 pb-10 "
      >
        <h1 className="text-2xl pb-4 font-semibold">
          How Does AddisJobs works?
        </h1>
        <p className="text-xl"> create an account</p>
        <p className="pb-4">
          Create an account and set up your profile by adding details about
          yourself such as your educational background, work experience, skills
          & qualifications. .
        </p>

        <p className="text-xl"> Browse for Jobs</p>
        <p className="pb-4">
          Browse through the jobs section and search for job openings that match
          your experience and interests.
        </p>

        <p className="text-xl"> Apply and stay alert</p>
        <p>
          You can apply for the job postings you are interested in or save
          vacancy posts to apply for later. .
        </p>
      </div>

      <div id="sign-in" className="pt-32 md:w-1/2 pb-10">
        <div
          id="signin-card"
          className="bg-white rounded-lg shadow-xl w-2/3 mx-auto"
        >
          <div className="flex flex-col p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <button
              onClick={handleGoogleSignin}
              className="bg-transparent text-black border shadow-md  p-3 mt-2 roundedfont-semibold z-10"
            >
              <div className="flex justify-center gap-2 items-center">
                <FaGoogle />
                <p>Log in with Google</p>
              </div>
            </button>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div id="divider" className="">
                <div className="flex border border-r-5 relative w-full justify-center ">
                  <span className="absolute -top-3 bg-white px-6 font-semibold">
                    or
                  </span>
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              {errors.email && (
                <span className="text-sm text-rose-500">
                  This field is required
                </span>
              )}

              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {errors.password?.type === "required" && (
                <span className="text-sm text-rose-500">
                  This field is required
                </span>
              )}

              <div className="flex justify-between">
                <div>
                  <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
                  <label for="rememberMe">Remember me</label>
                </div>
                <p>forgot password?</p>
              </div>

              <button
                type="submit"
                className="bg-black text-white p-3 mt-2 rounded hover:bg-slate-900 font-semibold"
              >
                {loading ? (
                  <div className="flex justify-center gap-2 items-center">
                    <span>Processing</span>
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute text-white !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </div>
                ) : (
                  "Log in"
                )}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
