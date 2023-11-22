import React from "react";

function Footer() {
  return (
    <div className="mb-0 text-white">
      <div className="flex flex-col sm:h-48 bg-slate-900 h-3/4 pt-5 xl:px-28 sm:px-10">
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-center pl-10 sm:pl-0 pb-2 xl:pt-5 ">
          <div id="about" className="flex flex-col flex-1 gap-2">
            <p className="font-semibold ">ABOUT ADDISJOBS</p>
            <p className="text-sm">
              AddisJobs is a popular Ethiopian Job searching website. Find
              Latest Ethiopian jobs in Ethiopia
            </p>
          </div>

          <div className="flex flex-col flex-1 sm:pl-5 gap-2">
            <p className="font-semibold">QUICK LINKS</p>
            <div className="flex flex-col text-sm">
              <p>Post Job</p>
              <p>Job Categories</p>
              <p>Companies</p>
            </div>
          </div>

          <div id="about" className="flex flex-col flex-1 gap-2">
            <p className="font-semibold">FOR JOB SEEKER</p>
            <div className="flex flex-col text-sm">
              <p>Post Job</p>
              <p>Job Categories</p>
              <p>Companies</p>
            </div>
          </div>

          <div id="about" className="flex flex-col flex-1 gap-2">
            <p className="font-semibold">FOR EMPLOYERS</p>
            <div className="flex flex-col text-sm">
              <p>Post Job</p>
              <p>Register</p>
              <p>Login</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 bg-black flex-1 text-center">
        © AddisJobs. 2023 - Brought to you by AddisSolutions
      </div>
    </div>
  );
}

export default Footer;
