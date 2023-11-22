import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/auth/authSlice";
import { app } from "./../firebase";
import { useNavigate } from "react-router-dom";
import { updateEmployerInfo } from "../redux/auth/authAction";
import { setSuccessToFalse } from "../redux/auth/authSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// import ScaleLoader from "react-spinners/ScaleLoader";

const EmployerSettingPage = () => {
  const { userInfo, loading, success } = useSelector((state) => state.auth);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (success) {
      setDisplayEdit(false);
      dispatch(setSuccessToFalse());
    }
  }, [success, userInfo]);

  const handleChange = (e) => {
    if (e.target.value == "") {
      console.log("is empty");
      if (formData.hasOwnProperty(e.target.id)) {
        console.log("triggred when empty");
        const newItems = { ...formData };
        delete newItems[e.target.id];
        setFormData(newItems);
        return;
        // delete formData[`${e.target.id}`];
      }
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // const data = await fetch(`/api/employer/updateemployer/${userInfo._id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    dispatch(updateEmployerInfo({ formData, id: userInfo._id }));

    // try {
    //   dispatch(updateUserStart());
    //   const res = await fetch(`/api/user/update/${currentUser._id}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   if (data.success === false) {
    //     dispatch(updateUserFailure(data.message));
    //     return;
    //   }

    //   dispatch(updateUserSuccess(data));
    //   setUpdateSuccess(true);
    // } catch (error) {
    //   dispatch(updateUserFailure(error.message));
  };

  const handleFileUpload = (file) => {
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
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, company_image: downloadURL })
        );
      }
    );
  };

  return (
    <div className="my-20">
      {displayEdit ? (
        <div className="bg-white rounded shadow-xl mt-28 w-1/2 mx-auto py-5 px-20">
          <form>
            <div className="flex flex-col w-full gap-4 ">
              <div className="flex flex-col items-center ">
                <img
                  onClick={() => fileRef.current.click()}
                  src={
                    formData.company_image
                      ? formData.company_image
                      : userInfo.company_image
                  }
                  className="rounded-full h-20 w-20 object-cover cursor-pointer "
                ></img>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <p className="text-sm pt-4">
                  {fileUploadError ? (
                    <span className="text-red-700">
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span className="text-green-700 ">
                      Image successfully uploaded!
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>

              <div className="flex flex-row gap-2 items-center ">
                <p className="w-1/3">Company Name</p>
                <input
                  type="text"
                  placeholder="company_name"
                  defaultValue={userInfo.company_name}
                  id="company_name"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row w-full gap-2 items-center">
                <p className="w-1/3 ">Contact Number </p>
                <input
                  type="text"
                  placeholder="contact_number"
                  defaultValue={userInfo.contact_number}
                  id="contact_number"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row w-full gap-2 items-center">
                <p className="w-1/3 ">Agency License Number</p>
                <input
                  type="text"
                  placeholder="contact_number"
                  defaultValue={userInfo.agency_license_number}
                  id="agency_license_number"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row w-full gap-2 items-center">
                <p className="w-1/3 ">Company Email</p>
                <input
                  type="text"
                  placeholder="email"
                  defaultValue={userInfo.email}
                  id="email"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row w-full gap-2 items-center">
                <p className="w-1/3 ">Password</p>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row w-full gap-2 items-center">
                <p className="w-1/3 ">Confirm Password</p>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  className="border p-3 rounded-lg w-2/3"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="mt-10 w-fit text-center py-2 px-10 bg-black rounded-lg shadow-lg text-white "
              >
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div
            id="card"
            className="mt-40 w-1/2 mx-auto bg-black rounded-lg shadow-lg"
          >
            <div className="flex flex-row">
              <div className="bg-black w-1/3">
                <img src={userInfo.company_image}></img>
              </div>
              <div className="flex flex-col bg-white w-2/3 py-10 px-10 gap-1">
                <div className="flex flex-row">
                  <p className="text-xl font-semibold">Company Name: </p>
                  <p className="text-xl "> {userInfo.company_name}</p>
                </div>

                <div className="flex flex-row">
                  <p className="text-xl font-semibold">Contact Number: </p>{" "}
                  <p className="text-xl ">{userInfo.contact_number}</p>
                </div>
                <div className="flex flex-row">
                  <p className="text-xl font-semibold">
                    Agency Licence Number:{" "}
                  </p>{" "}
                  <p className="text-xl ">{userInfo.agency_license_number}</p>
                </div>
                <div className="flex flex-row">
                  <p className="text-xl font-semibold">Email: </p>{" "}
                  <p className="text-xl ">{userInfo.email}</p>
                </div>

                <div className="flex flex-row">
                  <p className="text-xl font-semibold">Password: </p>{" "}
                  <p>*****</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-10 w-1/2 mx-auto ">
            <button
              onClick={() => {
                setDisplayEdit(true);
              }}
              className="text-center py-2 px-10 bg-black rounded-lg shadow-lg text-white"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerSettingPage;
