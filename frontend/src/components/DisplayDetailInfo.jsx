import React from "react";
import { useSelector } from "react-redux";

const DisplayDetailInfo = ({ handleGoToUpdate }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col px-20 pt-10 gap-5 w-full">
      <div className="text-2xl font-bold flex flex-row justify-between">
        <p>Detail Information</p>
        <button
          onClick={() => {
            handleGoToUpdate();
          }}
          className="text-sm bg-black text-white rounded p-2 font-normal hover:shadow-lg hover:scale-110"
        >
          Update Information
        </button>
      </div>
      <div className="flex flex-row gap-5">
        <div className="w-1/4 ">
          <img src={userInfo.user_image}></img>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Name:</p>
            <p>
              {userInfo.first_name} {userInfo.last_name}
            </p>
          </div>
          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Field of Study:</p>
            <p>
              {userInfo.education_status?.field_of_study != null
                ? userInfo.education_status.field_of_study
                : "not filled"}
            </p>
          </div>
          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Educational Level:</p>
            <p>
              {userInfo.education_status?.educational_level != null
                ? userInfo.education_status.educational_level
                : "not filled"}
            </p>
          </div>

          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">
              Job Title{" "}
              <span className="text-sm ">(if you are currently working*):</span>
            </p>
            <p>
              {userInfo.experience?.job_title
                ? userInfo.experience.job_title
                : "not filled"}
            </p>
          </div>
          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">
              company name{" "}
              <span className="text-sm ">(if you are currently working*):</span>
            </p>
            <p>
              {userInfo.experience?.company_name
                ? userInfo.experience.company_name
                : "not filled"}
            </p>
          </div>
          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">years of experience:</p>
            <p>
              {userInfo.experience?.year_of_experience
                ? userInfo.experience.year_of_experience
                : "not filled"}
            </p>
          </div>

          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Professions:</p>
            <p>
              {userInfo.experience?.profession[0]
                ? userInfo.experience.profession[0]
                : "not filled"}
            </p>
          </div>

          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Country:</p>
            <p>{userInfo.country ? userInfo.country : "not filled"}</p>
          </div>

          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">Region:</p>
            <p>{userInfo.region ? userInfo.region : "not filled"}</p>
          </div>

          <div className="flex flex-row gap-3 items-end">
            <p className="text-xl font-semibold">City:</p>
            <p>{userInfo.city ? userInfo.city : "not filled"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayDetailInfo;
