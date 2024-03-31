import React, { useState, useEffect } from "react";
import { profession } from "../utils/profession";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Footer from "../components/Footer";

const JobPage = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    job_category: "",
    work_location: "",
    sort: "created_at",
    // order: "desc",
  });

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

  const location = [
    "Addis Ababa",
    "Assela",
    "Assosa",
    "Adama",
    "Awassa",
    "Bahirdar",
    "Dessie",
    "Dire dawa",
    "Debrezeyt",
    "Nazret",
  ];

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    const jobCategoryFromUrl = urlParams.get("job_category");
    const workLocationFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    console.log("job" + jobCategoryFromUrl);
    if (
      searchTermFromUrl ||
      jobCategoryFromUrl ||
      workLocationFromUrl ||
      sortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        job_category: jobCategoryFromUrl || "",
        work_location: workLocationFromUrl || "",
        sort: sortFromUrl || "",
      });
    }

    const fetchPosts = async () => {
      if (posts.length != 0) {
        setPosts([]);
        console.log("reseted" + posts.length);
      }

      setLoading(true);
      // setShowMore(false);
      console.log("ifire once");
      let keysForDel = [];
      urlParams.forEach((value, key) => {
        if (value == "") {
          keysForDel.push(key);
        }
      });

      keysForDel.forEach((key) => {
        urlParams.delete(key);
      });
      const searchQuery = urlParams.toString();
      console.log("jobbelow" + jobCategoryFromUrl + searchQuery);

      const res = await fetch(`/api/post/searchJob?${searchQuery}`);
      const data = await res.json();
      // if (data.length > 8) {
      //   setShowMore(true);
      // } else {
      //   setShowMore(false);
      // }

      console.log(data.posts);

      setPosts(data.posts);

      setLoading(false);
    };

    fetchPosts();
  }, [window.location.search]);

  const handleChange = (e) => {
    setSidebardata({
      ...sidebardata,
      [e.target.id]: e.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(sidebardata);
  //   console.log(posts);
  // }, [sidebardata, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("work_location", sidebardata.work_location);
    urlParams.set("job_category", sidebardata.job_category);
    urlParams.set("sort", sidebardata.sort);
    // urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="mt-16">
      <div className="flex md:flex-row flex-col w-full">
        <form className="flex flex-col md:w-1/3 w-full md:border-r-2 md:h-screen pt-10 px-10 gap-3">
          <div>
            <div
              id="searchTermContainer"
              className="flex items-center gap-2 rounded-sm "
            >
              <p className="w-1/4">Search Term:</p>
              <input
                type="text"
                id="searchTerm"
                value={sidebardata.searchTerm}
                onChange={handleChange}
                className="py-2 px-3 w-3/4 border-2"
              />
            </div>
          </div>

          <div className="p-2 bg-white border-2 ">
            <select
              id="job_category"
              name="country"
              className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full "
              placeholder="select job catergory"
              selected="false"
              defaultValue=""
              value={sidebardata.job_category}
              onChange={handleChange}
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

          <div className="p-2 bg-white border-2 ">
            <select
              id="work_location"
              name="location"
              className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 w-full flex-1"
              placeholder="select location"
              selected="false"
              defaultValue=""
              onChange={handleChange}
            >
              <option disabled={true} value="">
                Find by Location
              </option>
              {location.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className=" mt-3 text-white p-2 bg-black"
          >
            Search
          </button>
        </form>

        <div className="flex flex-col px-10 gap-2 w-full">
          <h1 className="pt-5 text-2xl font-semibold">Job Result</h1>
          <div className="flex flex-col gap-5">
            {loading && <Skeleton count={5} height={100} />}
            {!loading && posts.length == 0 && <div>no result</div>}
            {posts.length != 0 &&
              posts.map((item, index) => (
                <div
                  onClick={() => navigate(`/job/${item._id}`)}
                  key={index}
                  className="group cursor-pointer bg-white p-5 flex flex-row justify-between hover:bg-black hover:text-white "
                >
                  <div className="flex gap-5">
                    <div>
                      {/* {item.employer_detail[0].company_image ? ( */}
                      <img
                        src={item.employer_detail[0].company_image}
                        className="h-14 w-14 rounded-full"
                      ></img>
                      {/* // ) : (
                      //   <Skeleton />
                      // )} */}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        {item.job_title || <Skeleton />} -{" "}
                        {item.employer_detail[0].company_name || <Skeleton />}
                      </div>
                      <div className="flex items-center gap-4">
                        posted at
                        <div className="flex items-center gap-2">
                          <BiCalendar />{" "}
                          {new Date(item.createdAt).toDateString()}
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
            {/* {posts.map((item, index) => (
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
            ))} */}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default JobPage;
