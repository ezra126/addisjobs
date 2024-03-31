import React, { useState, useEffect } from "react";
import { profession } from "../utils/profession";
import TextEditor from "../components/TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from "../redux/post/postAction";
import { setSuccessToFalse, setErrorToNull } from "../redux/post/postSlice";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditJobPage = () => {
  const EmployementType = ["Full Time", "Part Time", "Contractual"];
  const ExperienceLevel = [
    "Entry-level",
    "Intermediate",
    "Mid-level",
    "Senior or executive-level",
  ];
  const params = useParams();
  const [Remote, setRemote] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { success, error } = useSelector((state) => state.post);
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("job_description", { required: true });
    async function fetchPost() {
      const data = await fetch(`/api/employer/getpost/${params.postId}`, {
        method: "GET",
      });
      const body = await data.json();
      setPost(body);
      console.log(post);
    }

    fetchPost();
  }, []);

  useEffect(() => {
    setValue("job_title", post?.post?.job_title);
    setValue("job_category", post?.post?.job_category);
    setValue("payment", post?.post?.payment);
    setValue("employement_type", post?.post?.employement_type);
    setValue("experience_level", post?.post?.experience_level);
    setValue("deadline", post?.post?.deadline);
    setValue("job_description", post?.post?.job_description);
    setValue("work_location", post?.post?.work_location);
    setValue(
      "amount_of_people_required",
      post?.post?.amount_of_people_required
    );
    if (post?.post?.work_location == "remote") {
      document.getElementById("remote").checked = true;
      setRemote(true);
      //   setValue("work_location", post?.post?.work_location);
    }
  }, [post]);

  useEffect(() => {
    if (Remote) {
      setValue("work_location", "remote");
    }
  }, [Remote]);

  useEffect(() => {
    success
      ? toast("job post created succesfully", {
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
      navigate("/dashboard");
      dispatch(setSuccessToFalse());
    }
  }, [success]);

  const onSubmit = async (data) => {
    console.log(data);

    const body = await fetch(`/api/employer/updatepost/${params.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await body.json();

    if (res.success == "false") {
      return toast.error("failed to update");
    }

    toast("succesfully uploaded");

    // dispatch(addNewPost({ formData: data, id: userInfo._id }));
    // await fetch(`/api/employer/postjob/${userInfo._id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  const handleJobDescription = (value) => {
    setValue("job_description", value == "<p><br></p>" ? null : value);

    console.log("value" + value);
  };

  return (
    <div className="py-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:w-2/3 px-5 mx-auto gap-5">
          <div className="text-3xl font-bold text-center">Edit Vacancy</div>

          <div className="flex flex-row gap-5 ">
            <div className="flex-1 flex-col">
              <p>Job Title*</p>
              <div className="p-2 bg-white  border-2 rounded-lg">
                <input
                  type="text"
                  id="job_title"
                  autocomplete="off"
                  {...register("job_title", { required: true })}
                  placeholder="JOB TITLE"
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full focus:bg-transparent "
                />
              </div>
              {errors.job_title && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="flex-1 flex-col">
              <p>job category</p>
              <div className="p-2 bg-white border-2 rounded-lg">
                <select
                  id="job_category"
                  name="country"
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full"
                  defaultValue="select job category"
                  select="false"
                  {...register("job_category", {
                    validate: {
                      required: (value) => {
                        if (value == "select job category")
                          return "this field is required";
                        return true;
                      },
                    },
                  })}
                  // defaultValue={userInfo.country}
                  // onChange={handleCountryChange}
                >
                  <option
                    key={1000}
                    value="select job category"
                    className="hidden"
                  ></option>
                  {profession.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {errors.job_category && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          {post?.post?.job_description && (
            <div className="">
              <TextEditor
                handleJobDesc={handleJobDescription}
                value={post?.post?.job_description}
              />
              {errors.job_description && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          )}

          <div className="flex flex-row gap-5 ">
            <div className="flex-1 flex-col">
              <p>Employement Type*</p>
              <div className="p-2 bg-white border-2 rounded-lg">
                <select
                  id="employement_type"
                  name="employement_type"
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full"
                  defaultValue="select employement type"
                  {...register("employement_type", {
                    validate: {
                      required: (value) => {
                        if (value == "select employement type")
                          return "this field is required";
                        return true;
                      },
                    },
                  })}
                  // defaultValue={userInfo.country}
                  // onChange={handleCountryChange}
                >
                  <option
                    key={1000}
                    value="select employement type"
                    className="hidden"
                  ></option>
                  {EmployementType.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {errors.employement_type && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex-1 flex-col">
              <p>Payment*</p>
              <div className="p-2 bg-white  border-2 rounded-lg">
                <input
                  type="number"
                  id="payment"
                  autocomplete="off"
                  defaultValue="7000"
                  {...register("payment", { required: true })}
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full focus:bg-transparent "
                />
              </div>
              {errors.payment && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-5 ">
            <div className="flex flex-row w-1/2 justify-between gap-1 md:gap-0">
              <div className="flex  flex-col w-3/5">
                <p>Work Location*</p>
                <div className="p-2 bg-white  border-2 rounded-lg">
                  <input
                    type="text"
                    id="work_location"
                    autocomplete="off"
                    placeholder=""
                    value={Remote ? "" : undefined}
                    disabled={Remote}
                    {...register("work_location", {
                      validate: {
                        required: (value) => {
                          if (!value && !Remote)
                            return "This field is required";
                          return true;
                        },
                      },
                    })}
                    className={clsx(
                      "hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full focus:bg-transparent ",
                      Remote && "disabled"
                    )}
                  />
                </div>
                {errors.work_location && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="flex flex-row items-center pt-5 gap-2 pr-10">
                <input
                  type="checkbox"
                  id="remote"
                  onChange={() => {
                    setRemote(!Remote);
                  }}
                />
                <label for="remote" className="text-xl">
                  Remote
                </label>
              </div>
            </div>

            <div className="flex-1 flex-col w-1/2">
              <p>Amount of people required*</p>
              <div className="p-2 bg-white  border-2 rounded-lg">
                <input
                  type="number"
                  id="amount_of_people_required"
                  autocomplete="off"
                  {...register("amount_of_people_required", { required: true })}
                  placeholder=""
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full focus:bg-transparent "
                />
              </div>
              {errors.amount_of_people_required && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-5 ">
            <div className="flex-1 flex-col">
              <p>Deadline*</p>
              <div className="p-2 bg-white  border-2 rounded-lg w-1/2">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("deadline", { required: true })}
                  id="deadline"
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full focus:bg-transparent "
                />
              </div>
              {errors.deadline && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="flex-1 flex-col">
              <p> job experience levels*</p>
              <div className="p-2 bg-white border-2 rounded-lg">
                <select
                  id="experience_level"
                  name="experience_level"
                  className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full"
                  defaultValue="select experience level"
                  {...register("experience_level", {
                    validate: {
                      required: (value) => {
                        if (value == "select experience level") return "";
                        return true;
                      },
                    },
                  })}
                  // defaultValue={userInfo.country}
                  // onChange={handleCountryChange}
                >
                  <option
                    key={1000}
                    value="select experience level"
                    className="hidden"
                  ></option>
                  {ExperienceLevel.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {errors.experience_level && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black rounded px-4 py-2 mt-5 text-white text-center w-1/4 mx-auto"
          >
            EDIT JOB
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;
