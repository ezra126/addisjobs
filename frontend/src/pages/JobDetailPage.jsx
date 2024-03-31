import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const JobDetailPage = () => {
  const params = useParams();
  const { isEmployer, userInfo } = useSelector((state) => state.auth);
  const [job, setJob] = useState(undefined);

  useEffect(() => {
    async function fetchjob() {
      const res = await fetch(`/api/post/getjob/${params.jobId}`, {
        method: "GET",
      });

      const data = await res.json();
      console.log(data.Job);
      setTimeout(() => {
        setJob(data.Job);
      }, 2000);

      console.log("job" + job[0]._id);
    }

    fetchjob();
  }, []);

  if (!job) {
    return (
      <div className="relative flex flex-col h-screen w-screen justify-center items-center content-center">
        <div className=" bg-black h-screen w-screen opacity-40"></div>
        <div className="absolute z-1 ">
          <ClipLoader
            color="#ffffff"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-14 mb-20 ">
      <div className="mx-0 shadow-lg">
        <img
          src={job[0].employer_detail[0].company_image}
          className="w-screen h-96"
        ></img>
      </div>
      <div className="mt-10 px-20 ">
        <div className="flex flex-col md:w-3/5 gap-3">
          <div className="text-3xl font-semibold tracking-wide">
            {job[0].job_title} - {job[0].employer_detail[0].company_name}
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <FaBookmark />
              {job[0].employement_type}
            </div>

            <div>{job[0].work_location}</div>
            <div>{job[0].job_category}</div>
          </div>

          <div className="pt-5 text-3xl font-semibold tracking-wide">
            Job Overview
          </div>
          {Object.keys(userInfo).length != 0 && !isEmployer ? (
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-bold">
                  {job[0].employer_detail[0].company_name}{" "}
                </span>
                is looking for qualified applicant for the following open
                position
              </div>

              <div className="flex gap-3">
                <span className="font-semibold">Job Title :</span>
                {job[0].job_title}
              </div>

              <div className="flex gap-3">
                <span className="font-semibold">Job Type :</span>
                {job[0].employement_type}
              </div>

              <div className="flex gap-3">
                <span className="font-semibold">Experience :</span>
                {job[0].experience_level}
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-semibold">Job Description :</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${job[0].job_description}`,
                  }}
                ></div>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold">Salary :</span>
                {job[0].payment} birr
              </div>

              <div className="flex gap-3">
                <span className="font-semibold">Work Location :</span>
                {job[0].work_location}
              </div>
            </div>
          ) : (
            <div>
              <div>please login to see more detail</div>
              <div
                className="pt-5"
                style={{ filter: "blur(8px)", pointerEvents: "none" }}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="font-bold">
                      {job[0].employer_detail[0].company_name}{" "}
                    </span>
                    is looking for qualified applicant for the following open
                    position
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold">Job Title :</span>
                    {job[0].job_title}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold">Job Type :</span>
                    {job[0].employement_type}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-semibold">Salary :</span>
                    {job[0].payment} birr
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Job Description :</span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${job[0].job_description}`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
