import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaBriefcase } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { signout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";

function Header() {
  const { userInfo, isEmployer } = useSelector((state) => state.auth);
  const [Display, setDisplay] = useState(false);
  const [DisplaySetting, setDisplaySetting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("header" + Object.keys(userInfo).length === 0);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    setDisplaySetting(false);
    if (Object.keys(userInfo).length === 0 && !isEmployer) {
      navigate("/employer-signin");
    }
  }, [isEmployer]);

  return (
    <header className="bg-gray-950 shadow-md fixed top-0 z-40 w-screen">
      <div className="flex flex-row justify-between xl:px-20 px-14 py-3 items-center ">
        <div id="logo">
          <h1 className="font-semibold md:text-3xl text-2xl text-white ">
            ADDIS JOBS
          </h1>
        </div>

        {!isEmployer && (
          <div id="search" className="item-center ">
            <form className="relative " onSubmit={handleSubmit}>
              <button className="text-white absolute right-2 top-3 ">
                <FaSearch className="text-white w-8" />
              </button>
              <input
                type="text"
                className="xl:w-96 text-white bg-transparent border-white border rounded p-2 "
                placeholder="Search Job ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            </form>
          </div>
        )}

        <div
          id="links"
          className="hidden md:flex flex-row gap-5 text-white flex-wrap pl-2 "
        >
          {!isEmployer && (
            <>
              <Link to="/">
                <span>Home</span>
              </Link>
              <Link to="/search">
                <span>Jobs</span>
              </Link>
              <Link to="/about">
                <span>About</span>
              </Link>
            </>
          )}

          {isEmployer && (
            <>
              <Link to="/dashboard">
                <span>Dashboard</span>
              </Link>
              <Link to="/post-job">
                <span>Post Jobs</span>
              </Link>
              {/* <Link to="/about">
               <span>About</span>
             </Link> */}
            </>
          )}

          {/* // Object.keys(userInfo).length != 0  */}
          {Object.keys(userInfo).length != 0 ? (
            <>
              {isEmployer ? (
                <>
                  <Link
                    to="/employer-setting"
                    onMouseOver={() => setDisplaySetting(true)}
                  >
                    <img
                      src={userInfo.company_image}
                      className="rounded-full h-6 w-6 object-cover "
                    ></img>
                  </Link>

                  {DisplaySetting && (
                    <div
                      className="absolute top-16 right-10 bg-white text-black px-3 py-2 rounded-xl"
                      onMouseLeave={() => setDisplaySetting(false)}
                    >
                      <Link to="/employer-setting">
                        <div onClick={() => setDisplaySetting(false)}>
                          Profile
                        </div>
                      </Link>
                      <div className=" border-b-2"></div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setDisplaySetting(false);
                          dispatch(signout());
                        }}
                      >
                        Sign out
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/setting">
                  <img
                    src={userInfo.user_image}
                    className="rounded-full h-6 w-6 object-cover "
                  ></img>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/signin">
                <div
                  className="flex items-center gap-1"
                  onMouseOver={() => setDisplay(false)}
                >
                  <FaSignInAlt />
                  <p>Job seeker Login</p>
                </div>
              </Link>

              <div
                className="flex text-white pt-1"
                onMouseOver={() => setDisplay(true)}
              >
                <FaBriefcase />

                {Display && (
                  <div
                    className="absolute top-16 right-10 bg-white text-black px-3 py-2 rounded-xl"
                    onMouseLeave={() => setDisplay(false)}
                  >
                    <Link to="/employer-signin">
                      <div onClick={() => setDisplay(false)}>
                        Login as Employer
                      </div>
                    </Link>

                    <div className=" border-b-2"></div>
                    <Link to="/employer-signup">
                      <div onClick={() => setDisplay(false)}>
                        Register as Employer
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
