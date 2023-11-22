import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { clsx } from "clsx";
import Profile from "../components/Profile";
import Detail from "../components/Detail";

const SettingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname == "/setting") {
      navigate("/setting/profile");
    }

    console.log("currnt path" + currentPath);
  }, [location, currentPath]);

  // useEffect(() => {
  //   setCurrentPath(location.pathname);
  // }, []);

  return (
    <div className="">
      <div className="mt-24 border-b-2 xl:px-20 px-14 pb-0 flex flex-col gap-2 font-semibold overflow-auto ">
        <h1 className=" text-2xl font-semibold">Settings</h1>

        <div className="flex gap-2 ">
          {/* <Navigate
            to="profile"
            className="border-transparent rounded-t-lg hover:text-gray-600 hover:border-b hover:border-indigo-500"
          >
         
          </Navigate> */}
          <Link
            to="profile"
            className={clsx(
              "border-transparent rounded-t-lg border-b-2 pb-2 text-gray-600",
              location.pathname == ("/setting/profile" || "/setting") &&
                " border-slate-950 text-slate-950"
            )}
          >
            <p>Profile</p>
          </Link>
          <Link
            to="detail_info"
            className={clsx(
              "border-transparent rounded-t-lg border-b-2 pb-2 text-gray-600",
              location.pathname == "/setting/detail_info" &&
                "border-slate-950 text-slate-950"
            )}
          >
            <p>Detail</p>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default SettingPage;
