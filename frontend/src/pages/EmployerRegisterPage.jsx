import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerEmployer } from "../redux/auth/authAction";
import { setErrorToNull, setSuccessToFalse } from "../redux/auth/authSlice";

const EmployerRegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error, success, googlesuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    success
      ? toast("employer register successfully", {
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
    if (success) {
      navigate("/employer-signin");
      dispatch(setSuccessToFalse());
    }
  }, [success]);

  const onSubmit = async (formdata) => {
    console.log(formdata);
    dispatch(registerEmployer(formdata));
  };

  return (
    <div className="flex md:flex-row flex-col sm:h-5/6 shadow ">
      <div id="sign-up" className="pt-32 md:w-1/2 pb-10">
        <div
          id="signup-card"
          className="bg-white rounded-lg shadow-lg w-2/3 mx-auto"
        >
          <div className="flex flex-col p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Signup as Employer
            </h1>

            {/* <button
              type="google"
              //   onClick={handleGoogleSignUp}
              className="bg-transparent text-black border shadow-md  p-3 mt-2 roundedfont-semibold z-10"
            >
              <div className="flex justify-center gap-2 items-center">
                <FaGoogle />
                <p>Register with Google</p>
              </div>
            </button> */}

            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="company_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  {...register("company_name", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name of your company"
                />
                {errors.company_name && (
                  <span className="text-sm text-rose-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact_number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  name="contact_number"
                  id="contact_number"
                  {...register("contact_number", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company's contact number"
                />
                {errors.contact_number && (
                  <span className="text-sm text-rose-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="agency_license_number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Agency License Number
                </label>
                <input
                  type="number"
                  name="agency_license_number"
                  id="agency_license_number"
                  {...register("agency_license_number", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="agency license number"
                />
                {errors.agency_license_number && (
                  <span className="text-sm text-rose-500">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
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
                {errors.email && (
                  <span className="text-sm text-rose-500">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", { required: true, minLength: 4 })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errors.password?.type === "required" && (
                  <span className="text-sm text-rose-500">
                    This field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-sm text-rose-500">
                    password lenght should me minimm four
                  </span>
                )}
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
                  "Sign up"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                already have an account?{" "}
                <Link
                  to="/employer-signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in as Employer
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div
        id="sign-in-description"
        className="bg-gradient-to-r from-gray-900 to-gray-700 md:w-1/2 text-white pt-40 px-10 pb-10 "
      >
        <h1 className="text-2xl pb-4 font-semibold">
          How Does AddisJobs works?
        </h1>
        <p className="text-xl"> Create an account</p>
        <p className="pb-4">
          Create an account and set up your profile by adding details about your
          company
        </p>

        <p className="text-xl"> Post Job</p>
        <p className="pb-4">
          Post a Job with requirement and let job seekers finds you
        </p>

        <p className="text-xl"> Browse for applicant</p>
        <p>you can browse applicant and access their resume and profile</p>
      </div>
    </div>
  );
};

export default EmployerRegisterPage;
