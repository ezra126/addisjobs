/* eslint-disable no-redeclare */

import { useState, useEffect } from "react";
import { country_with_region_list } from "../utils/countryList.js";
import { setErrorToNull } from "../redux/auth/authSlice.js";
import Selector from "./Selector.jsx";
import DisplayDetailInfo from "./DisplayDetailInfo.jsx";
import MultipleSelector from "./MultipleSelector.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetailInfo } from "../redux/auth/authAction.js";
import clsx from "clsx";

const Detail = () => {
  const [currentCountry, setcurrentCountry] = useState("Ethiopia");
  const [haveJob, setHaveJob] = useState(false);
  const [regions, setregions] = useState({});
  const [formdata, setFormData] = useState({
    year_of_experience: "0",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const [professionList, setProfessionList] =
    userInfo.experience?.profession?.length > 0
      ? useState(userInfo.experience?.profession)
      : useState([]);
  const [showDisplay, setShowDisplay] = useState(true);
  const [fieldofstudy, setFieldStudy] = useState("");
  const [educationalLevel, setEducationLevel] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchRegion(currentCountry);
    // setregions(regions[1])
    console.log("sending region");
  }, [currentCountry]);

  // useEffect(() => {
  //   console.log(professionList[0] + " sdfkdfkdfkndknjkvndjknjkdnkvndkj");
  // });
  // useEffect(() => {
  //   if (userInfo.experience?.profession?.length > 0) {
  //     setProfessionList(userInfo.experience?.profession);
  //   }
  // }, []);

  useEffect(() => {
    if (!showDisplay) {
      document.getElementById("country").defaultValue == "Ethiopia";
      setFormData({
        ...formdata,
        ["country"]: "Ethiopia",
      });
    }
    dispatch(setErrorToNull());
    if (userInfo.experience?.is_current_job != null) {
      if (userInfo.experience.is_current_job) {
        var radiobtn = document.getElementById("radio-yes");
        radiobtn.checked = true;
        setHaveJob(true);
        return;
      }
      var radiobtn = document.getElementById("radio-no");
      radiobtn.checked = true;
      setHaveJob(false);
    }
  }, []);

  useEffect(() => {
    console.log(formdata);

    if (!showDisplay) {
      document.getElementById("region").defaultValue == "select region";
    }
  }, [formdata, currentCountry, regions]);

  useEffect(() => {
    console.log(professionList + "trigger affterpro list change");
    console.log(professionList[0] + " sdfkdfkdfkndknjkvndjknjkdnkvndkj");
    setFormData({
      ...formdata,
      ["profession"]: [...professionList],
    });
  }, [professionList]);
  //  handle cancel and adding items from MultipleSelector component
  const handleClickforMultiSelector = (item) => {
    setProfessionList([...professionList, item]);
    // setFormData({
    //   ...formdata,
    //   ["profession"]: [...professionList],
    // });
    // console.log(formdata);
  };

  const handleCancelClickforMultiSelector = (item) => {
    setProfessionList(professionList.filter((i) => i !== item));
    // console.log(professionList + "what hapkjfj");
    // setFormData({
    //   ...formdata,
    //   ["profession"]: [...professionList],
    // });
  };

  //handle click for selector

  const handleChange = (e) => {
    console.log("handle change is calling");
    if (e.target.name == "currentJob") {
      if (e.target.value == "No") {
        const { company_name, job_title, ...rest } = formdata;
        console.log("");
        setFormData({
          ...rest,
          ["is_current_job"]: "No",
        });
        return;
      }
      setFormData({
        ...formdata,
        ["is_current_job"]: e.target.value,
      });
      return;
    }

    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleClickforSelector = (item, type) => {
    if (type == "FieldOfStudy") {
      setFieldStudy(item);
      setFormData({
        ...formdata,
        ["field_of_study"]: item,
      });
      return;
    } else if (type == "EducationalLevel") {
      setEducationLevel(item);
      setFormData({
        ...formdata,
        ["educational_level"]: item,
      });
    }
  };

  const showUpdateDetail = () => {
    setShowDisplay(false);
  };

  const handleCountryChange = (e) => {
    console.log("hello");
    setcurrentCountry(e.target.value);
    fetchRegion(e.target.value);
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const fetchRegion = (value) => {
    const country = country_with_region_list.find(
      (element) => element.countryName == value
    );
    console.log("add region");
    console.log(regions);
    setregions(country.regions);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (e.target.id == "year_of_experience") {
      alert("am heare");
      if (e.target.value == null) {
        setFormData({
          ...formdata,
          [e.target.id]: 0,
        });
      }
    }

    dispatch(
      updateUserDetailInfo({ formData: formdata, id: userInfo._id })
    ).then(() => {
      toast("Saved Success");
      setTimeout(() => {
        setShowDisplay(true);
      }, 3000);
    });

    // const data = await fetch(`/api/user/updatedetailinfo/${userInfo._id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(formdata),
    // });
    // const body = await data.json();
    // console.log(body + "body");
    // console.log(formdata);
  };

  return (
    <>
      <div
        className={clsx(
          showDisplay
            ? // && userInfo.hasOwnProperty("country")
              ""
            : "hidden"
        )}
      >
        <DisplayDetailInfo handleGoToUpdate={showUpdateDetail} />
      </div>
      <div className={clsx(!showDisplay ? "" : "hidden")}>
        <div className="flex flex-col md:px-20 px-5 pt-3 gap-5  ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold ">
              Tell Us About Your Self{" "}
            </h1>
            <p>
              Your account is being set up, help us find you jobs that best
              suits you
            </p>
          </div>

          <div>
            <p>Make easier for employers to contact you</p>
            <form>
              <div className="flex md:flex-row flex-col w-screen">
                <div className="flex flex-col md:w-1/2">
                  <div className="flex flex-row flex-wrap gap-5 mt-5">
                    <div className="flex flex-col gap-2 w-1/4">
                      <label htmlFor="country" className="text-sm">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="p-2 bg-white border"
                        defaultValue={userInfo.country}
                        onChange={handleCountryChange}
                      >
                        {country_with_region_list.map((item, i) => (
                          <option key={i} value={item.countryName}>
                            {item.countryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 w-1/4">
                      <label for="region" className="text-sm">
                        Region
                      </label>
                      <select
                        id="region"
                        name="region"
                        className="p-2 bg-white border"
                        onChange={handleChange}
                      >
                        {JSON.stringify(regions) !== "{}" &&
                          regions.map((item, i) => (
                            <>
                              {i == 0 && (
                                <option
                                  key={"100"}
                                  value="select region"
                                  selected
                                >
                                  select region
                                </option>
                              )}
                              <option key={i} value={item.name}>
                                {item.name}
                              </option>
                            </>
                          ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-1/4">
                      <label htmlFor="city" className="text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="p-2 bg-white border"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Selector
                      ListType="FieldOfStudy"
                      handleClick={handleClickforSelector}
                    />
                  </div>

                  <div>
                    <Selector
                      ListType="EducationalLevel"
                      handleClick={handleClickforSelector}
                    />
                  </div>

                  <button
                    onClick={handleOnSubmit}
                    className="bg-black text-white rounded mt-16 w-fit py-2 px-10 hover:shadow-lg hover:scale-110"
                  >
                    Finish
                  </button>
                </div>

                <div id="" className="flex flex-col  md:w-1/2 pr-10">
                  <div className="flex flex-col gap-2 pt-4">
                    <p className="text-sm">Profession</p>
                    <MultipleSelector
                      handleClick={handleClickforMultiSelector}
                      handleCancelClick={handleCancelClickforMultiSelector}
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <p className="text-sm">
                      Total Years of Experience(optional) (if you do not have
                      one please submit 0)
                    </p>
                    <div className="p-2 bg-white w-3/4 border-2">
                      <input
                        type="number"
                        max={40}
                        min={0}
                        id="year_of_experience"
                        onChange={handleChange}
                        defaultValue={
                          userInfo.experience?.year_of_experience != undefined
                            ? userInfo.experience?.year_of_experience
                            : "0"
                        }
                        placeholder="Total Years of Experience"
                        className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <p className="text-sm">Are You Currently Working?</p>
                    <div
                      className="flex flex-row gap-2 justify-start"
                      onChange={handleChange}
                    >
                      <div
                        className="flex flex-row gap-1"
                        onChange={handleChange}
                      >
                        <input
                          type="radio"
                          value="No"
                          id="radio-no"
                          name="currentJob"
                          onClick={() => {
                            setHaveJob(false);
                          }}
                        />
                        <label>No</label>
                      </div>

                      <div className="flex flex-row gap-1">
                        <input
                          type="radio"
                          value="Yes"
                          id="radio-yes"
                          name="currentJob"
                          onClick={() => {
                            setHaveJob(true);
                          }}
                        />
                        <label htmlFor="">Yes</label>
                      </div>
                    </div>
                  </div>

                  {haveJob && (
                    <div className="flex flex-col gap-2 pt-4">
                      <p className="text-sm">
                        Currently Employed at & Job Title (optional) (if you
                        don't have one please submit "No")
                      </p>
                      <div className="flex flex-row w-3/4 gap-2">
                        <div className="p-2 bg-white w-3/4 border-2">
                          <input
                            type="text"
                            id="company_name"
                            onChange={handleChange}
                            defaultValue={
                              userInfo.experience.is_current_job &&
                              userInfo.experience.company_name != null
                                ? userInfo.experience.company_name
                                : ""
                            }
                            placeholder="Currently Employed at"
                            className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1"
                          />
                        </div>

                        <div className="p-2 bg-white w-3/4 border-2">
                          <input
                            type="text"
                            id="job_title"
                            onChange={handleChange}
                            defaultValue={
                              userInfo.experience.is_current_job &&
                              userInfo.experience.job_title != null
                                ? userInfo.experience.job_title
                                : ""
                            }
                            placeholder="Current Job Title"
                            className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
