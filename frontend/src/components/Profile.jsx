// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserBasicInfo } from "../redux/auth/authAction";
import { signout } from "../redux/auth/authSlice";
import { app } from "./../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ScaleLoader from "react-spinners/ScaleLoader";

const Profile = () => {
  const { userInfo, isgooglesign, loading } = useSelector(
    (state) => state.auth
  );
  const inputref = useRef(null);
  const [file, setfile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const dispatch = useDispatch();
  var today = new Date();
  var yyyy = today.getFullYear() - 18;
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var maxyear = yyyy + "-" + mm + "-" + dd;
  console.log("user image" + userInfo.user_image);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    console.log("function is called");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        if (filePerc === 100) {
          setFilePerc(0);
        }
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData({ ...formData, user_image: downloadURL });
        });
      }
    );
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        console.log("error ocuureed");
        return;
      }
      dispatch(signout());
      toast("logout succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (JSON.stringify(formData) === "{}") {
      return;
    }

    dispatch(
      updateUserBasicInfo({
        formData,
        id: userInfo._id,
      })
    ).then(() => {
      toast("saved succesfuly");
    });

    // const data = await fetch(`/api/user/updatebasicinfo/${userInfo._id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const body = await data.json();
    // console.log(body);
  };

  return (
    <div>
      <div className="mt-12">
        <div className="flex  h-screen w-screen">
          <div className="w-1/3 border-r-2 px-10 ">
            <div className="flex flex-col justify-between items-center gap-48 mb-12">
              <div className="flex flex-col items-center gap-3">
                <h1 className="font-semibold text-2xl"> Profile</h1>
                <img
                  src={formData.user_image || userInfo.user_image}
                  className="rounded-full h-14 w-14 object-cover"
                ></img>
                <h1 className="font-serif font-extralight ">
                  {userInfo.first_name} {userInfo.last_name}{" "}
                </h1>
                <input
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                  id="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputref}
                />
                <button
                  onClick={() => inputref.current.click()}
                  className="p-2 bg-black text-white rounded-lg hover:scale-110 hover:shadow-md"
                >
                  Change Profile Image
                </button>
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700 text-center">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <button
                  onClick={handleSignOut}
                  className="p-2  bg-transparent text-black border-black border-2 rounded-lg hover:scale-110 hover:shadow-xl"
                >
                  sign out
                </button>
              </div>
              <ScaleLoader
                color="#36d7b7"
                loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>

          <div className="flex flex-col w-full px-24 ">
            <div>
              <form className="flex flex-col gap-3">
                <div className="flex justify-between w-full border-b-2 pb-3">
                  <h1 className="font-semibold text-2xl">Basic Info</h1>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={handleCancel}
                      className="p-2  bg-transparent text-black border-black border-2 rounded-lg hover:scale-110 hover:shadow-xl"
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="py-2 px-4 bg-black text-white rounded-lg hover:scale-110 hover:shadow-md"
                    >
                      save
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex flex-row justify-between gap-3 ">
                  <div
                    id="first_name"
                    className="flex-1 flex-col"
                    onChange={handleChange}
                  >
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      defaultValue={userInfo.first_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div id="last_name" className="flex-1 flex-col">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      onChange={handleChange}
                      defaultValue={userInfo.last_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                {!isgooglesign ? (
                  <>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={userInfo.email}
                        required=""
                      />
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
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="number"
                    id="phone_number"
                    onChange={handleChange}
                    defaultValue={userInfo.phone_number}
                    placeholder="251911000000"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div className="flex flex-row gap-10">
                  <div className="flex flex-col">
                    <label htmlFor="birthday">Birth Date:</label>
                    <input
                      type="date"
                      className="p-3 bg-gray-50 border"
                      id="date_of_birth"
                      onChange={handleChange}
                      max={maxyear}
                      name="birth date"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      className="p-3 bg-gray-50 border"
                      onChange={handleChange}
                    >
                      <option value="">Please select one</option>
                      <option
                        value="Male"
                        selected={userInfo.gender == "Male" ? true : false}
                      >
                        MALE
                      </option>
                      <option
                        value="Female"
                        selected={userInfo.gender == "Female" ? true : false}
                      >
                        FEMALE
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
