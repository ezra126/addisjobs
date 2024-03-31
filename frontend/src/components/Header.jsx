import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaBriefcase } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { signout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const { userInfo, isEmployer } = useSelector((state) => state.auth);
  const [Display, setDisplay] = useState(false);
  const [DisplaySetting, setDisplaySetting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hamburgerClick, setHamburgerclick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("header" + Object.keys(userInfo).length === 0);
  });

  // useEffect(()=>{

  // },[navigate])

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
      <div className="flex flex-row justify-between sm:px-20 md:px-10 px-10 py-3 items-center gap-2">
        <div id="logo">
          <h1 className="font-semibold xl:text-3xl text-xl text-white ">
            ADDIS JOBS
          </h1>
        </div>

        {!isEmployer && (
          <div id="search" className="item-center  ">
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
          className="md:hidden text-white"
          onClick={() => {
            setHamburgerclick(!hamburgerClick);
          }}
        >
          <GiHamburgerMenu />
        </div>

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

      {hamburgerClick && (
        <div className="md:hidden bg-black text-white h-fit w-screen transition-all delay-150 ease-out mb-5">
          <div className="flex flex-col items-center ">
            {!isEmployer && (
              <>
                <Link
                  to="/"
                  className="py-2 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  <span>Home</span>
                </Link>
                <Link
                  to="/search"
                  className="py-3 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  <span>Jobs</span>
                </Link>
                <Link
                  to="/about"
                  className="py-3 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  <span>About</span>
                </Link>
              </>
            )}

            {isEmployer && (
              <>
                <Link
                  to="/dashboard"
                  className="py-2 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/post-job"
                  className="py-2 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  <span>Post Jobs</span>
                </Link>
                {/* <Link to="/about">
               <span>About</span>
             </Link> */}
              </>
            )}

            {Object.keys(userInfo).length != 0 ? (
              <>
                {isEmployer ? (
                  <>
                    {/* <Link
                      to="/employer-setting"
                      onMouseOver={() => setDisplaySetting(true)}
                    >
                      <img
                        src={userInfo.company_image}
                        className="rounded-full h-6 w-6 object-cover "
                      ></img>
                    </Link> */}

                    <Link
                      to="/employer-setting"
                      className="py-2 hover:bg-gray-700 w-full text-center"
                      onClick={() => {
                        setHamburgerclick(false);
                      }}
                    >
                      Profile
                    </Link>

                    <div
                      className="py-2 hover:bg-gray-700 w-full text-center"
                      onClick={() => {
                        setHamburgerclick(false);
                        dispatch(signout());
                      }}
                    >
                      Sign out
                    </div>
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
                <Link
                  to="/signin"
                  className="py-2 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  Login as Job Seeker
                </Link>

                <Link
                  to="/employer-signin"
                  className="py-2 hover:bg-gray-700 w-full text-center"
                  onClick={() => {
                    setHamburgerclick(false);
                  }}
                >
                  Login as Employer
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
