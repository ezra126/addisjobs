/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import background from "../assets/background.webp";
import Footer from "../components/Footer";
import CountUp from "react-countup";
import { profession } from "../utils/profession";
import Selector from "../components/Selector";
import { BiCalendar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function HomePage() {
  const [availableJobByCategory, setavailableJobByCategory] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);
  const [Info, setInfo] = useState({});
  const navigate = useNavigate();
  const location = [
    "addis ababa",
    "assela",
    "assosa",
    "adama",
    "awassa",
    "bahirdar",
    "dessie",
    "dire dawa",
    "debrezeyt",
  ];

  const calculateDate = (posted_date) => {
    var currentDate = new Date();
    var postedDate = new Date(posted_date);

    var Difference_In_Time = currentDate.getTime() - postedDate.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (Difference_In_Days < 1) {
      var hourDifference = Difference_In_Time / (1000 * 3600);
      return Math.floor(hourDifference) + " Hours";
    }
    return Math.floor(Difference_In_Days) + " Days";
  };

  useEffect(() => {
    async function fetchTotalPostandEmployer() {
      const data = await fetch("/api/post/getpostandemployerinfo", {
        method: "GET",
      });

      const body = await data.json();

      setInfo({
        no_of_posts: body[0].posts[0].numberofpost,
        no_of_employers: body[0].employers[0].numberofemployer,
      });
    }
    fetchTotalPostandEmployer();
  }, []);

  useEffect(() => {
    async function fetchListJobCategoryByNumber() {
      const data = await fetch("/api/employer/listJobCategoryByNumber", {
        method: "GET",
      });

      const body = await data.json();
      console.log(body.post);
      //setavailableJobByCategory(body.post);
      if (availableJobByCategory == 0) {
        setavailableJobByCategory(body.post);
        // console.log("lsit" + availableJobByCategory[1]._id);
      }
    }
    fetchListJobCategoryByNumber();
  }, [availableJobByCategory]);

  useEffect(() => {
    async function fetchLatestjobs() {
      const data = await fetch("/api/post/getlatestjobs", {
        method: "GET",
      });

      const body = await data.json();
      if (latestJobs == 0) {
        setLatestJobs(body.latestJobs);
      }

      //console.log(latestJobs[0].createdAt);

      const date = new Date(latestJobs[0].createdAt);
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      console.log(date.toDateString());
    }

    fetchLatestjobs();
  }, [latestJobs]);

  return (
    <div className="">
      <div id="bg-image" className="relative shadow-xl">
        <img src={background} style={{ maxHeight: 500, width: "100%" }}></img>
        <h1 className="absolute text-white top-24 xl:top-40 md:px-20 w:2/3 sm:w-1/2 px-14 text-2xl sm:text:3xl md:text-4xl  font-semibold  w-30vw ">
          Join Ethiopia’s Large Work Marketplace
        </h1>
      </div>
      <div className="flex flex-col pb-20 gap-10">
        <div className="flex mt-20 w-full justify-center ">
          <div className="flex flex-row justify-between gap-20 ">
            <div className="flex flex-col gap-2 items-center ">
              <div className="text-3xl font-semibold">
                <CountUp end={Info.no_of_posts} />+
              </div>
              <div className="text-2xl font-bold w-[200px]">
                Total Jobs Posted
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 items-center">
              <div className="text-3xl font-semibold">
                <CountUp end={Info.no_of_employers} />+
              </div>
              <div className="text-2xl font-bold w-fit text-center">
                Organizations
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 items-center ">
              <div className="text-3xl font-semibold">
                {" "}
                <CountUp end={Info.no_of_posts} />+
              </div>
              <div className="text-2xl font-bold w-fit text-center">
                Active Jobs
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-20 w-full items-center gap-5">
          <div className="text-4xl font-bold">Find New Jobs in Ethiopia</div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-1">
              <input
                id="keyword"
                name="keyword"
                type="text"
                placeholder="keyword"
                className="p-2 bg-white border"
              />
            </div>
            <div className="p-2 bg-white border-2 flex-1">
              <select
                id="job_category"
                name="country"
                className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full flex-1"
                placeholder="select job catergory"
                selected="false"
                defaultValue=""
                // onChange={handleCountryChange}
              >
                <option disabled={true} value="">
                  Job Category
                </option>
                {profession.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-2 bg-white border-2 flex-1">
              <select
                id="location"
                name="location"
                className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full flex-1"
                placeholder="select location"
                selected="false"
                defaultValue=""
                // onChange={handleCountryChange}
              >
                <option disabled={true} value="">
                  find by location
                </option>
                {location.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <button className="text-white bg-black h-full border-0 px-10">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-3/4 mx-auto list-none justify-center place-items-center bg-white rounded-lg p-10 ">
          {availableJobByCategory.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(`/job-category/${item._id}`)}
            >
              {item._id}{" "}
              <span className="text-lime-600">{`(${item.count})`}</span>
            </li>
          ))}
        </div>

        <div className="w-3/4 mx-auto mt-5">
          <div className="text-3xl font-bold mb-5">
            Latest Jobs in Ethiopia{" "}
          </div>
          <div className="flex flex-col gap-5">
            {latestJobs.length == 0 && <Skeleton count={5} height={100} />}
            {latestJobs.map((item, index) => (
              <div
                onClick={() => navigate(`/job/${item._id}`)}
                key={index}
                className="group cursor-pointer bg-white p-5 flex flex-row justify-between hover:bg-black hover:text-white "
              >
                <div className="flex gap-5">
                  <div>
                    {item.employer_detail[0].company_image ? (
                      <img
                        src={item.employer_detail[0].company_image}
                        className="h-14 w-14 rounded-full"
                      ></img>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      {item.job_title || <Skeleton />} -{" "}
                      {item.employer_detail[0].company_name || <Skeleton />}
                    </div>
                    <div className="flex items-center gap-4">
                      posted at
                      <div className="flex items-center gap-2">
                        <BiCalendar /> {new Date(item.createdAt).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-black text-white group-hover:text-black group-hover:bg-white px-3 py-2 rounded shadow-lg">
                    view more{" "}
                  </button>
                  <p className="text-center">
                    {calculateDate(item.createdAt)} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
