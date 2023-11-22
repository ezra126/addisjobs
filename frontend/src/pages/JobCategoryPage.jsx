import React, { useEffect, useState } from "react";
import background from "../assets/background.webp";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { BiCalendar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { usePagination } from "../utils/usePagination";

const JobCategoryPage = () => {
  const params = useParams();
  const [posts, setPost] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const itemsPerPage = 2;
  const [pageCount, setPageCount] = useState(1);

  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);

  const navigate = useNavigate();

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

  const handleFetch = async (offSet) => {
    // setPost([]);
    // setTotalPost(0);
    // alert("ofos" + offSet);
    const res = await fetch(
      `/api/post/getpostbyjobcategory/${params.category}?startIndex=${
        offSet || null
        // currentPage == 0 ? currentPage : currentPage * itemsPerPage
      }`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    console.log(data.posts[0]);
    //alert(data.posts[0].total_posts[0].total_posts + "total posts");

    setTimeout(() => {
      setPost(data.posts[0].posts);
      setTotalPost(data.posts[0].total_posts[0].total_posts);
      setPageCount(
        Math.ceil(data.posts[0].total_posts[0].total_posts / itemsPerPage)
      );

      setisLoaded(true);
    }, 2000);
  };

  const handlePageChange = (selectedObject) => {
    setPost([]);
    if (totalPost != 0) {
      setTotalPost(0);
    }
    // alert(selectedObject.selected);
    setcurrentPage(selectedObject.selected);

    handleFetch(selectedObject.selected * itemsPerPage);
  };

  useEffect(() => {
    if (totalPost == 0 && currentPage == 0) {
      handleFetch();
    }
  }, [totalPost]);

  //   useEffect(() => {
  //     async function fetchJobByCategory() {
  //       const res = await fetch(
  //         `/api/post/getpostbyjobcategory/${params.category}
  //         }`,
  //         {
  //           method: "GET",
  //         }
  //       );

  //       const data = await res.json();
  //       console.log(data.posts[0]);
  //       //alert(data.posts[0].total_posts[0].total_posts + "total posts");
  //       setTimeout(() => {
  //         setPost(data.posts[0].posts);
  //         setTotalPost(data.posts[0].total_posts[0].total_posts);

  //       }, 2000);

  //       //   console.log("job" + job[0]._id);
  //     }

  //     fetchJobByCategory();
  //   }, []);

  return (
    <div>
      <div id="bg-image" className="relative shadow-xl">
        <img src={background} style={{ maxHeight: 400, width: "100%" }}></img>
        <h1 className="absolute text-white top-24 xl:top-40 md:px-20 w:2/3 sm:w-1/2 px-14 text-2xl sm:text:3xl md:text-4xl  font-semibold  w-30vw ">
          Join Ethiopia’s Large Work Marketplace
        </h1>
      </div>
      <div className="flex flex-col gap-2 px-20 my-10">
        {posts.length == 0 && <Skeleton count={2} height={100} />}
      </div>
      <div className="flex flex-col gap-2 px-20 my-10">
        {posts.map((item, index) => (
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
              <p className="text-center">{calculateDate(item.createdAt)} ago</p>
            </div>
          </div>
        ))}

        {isLoaded && (
          <ReactPaginate
            containerClassName={
              "flex flex-row py-10 px-20  justify-center gap-3 text-xl"
            }
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        )}
      </div>
      //{" "}
    </div>
  );
};

export default JobCategoryPage;
