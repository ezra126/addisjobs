import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaBriefcase, FaCalendarCheck, FaClock } from "react-icons/fa";
// import { CiCalendar } from "react-icons/ci";
// import { Suspense } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { setSuccessToFalse } from "../redux/post/postSlice";
import ReactPaginate from "react-paginate";

const DashBoardPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const { posts, loading } = useSelector((state) => state.post);
  const [MyPosts, setMyPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const itemsPerPage = 4;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = MyPosts.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    // dispatch(fetchAllPosts({ employerId: userInfo._id }));

    async function fetchMyPost() {
      setloading(true);
      await fetch(`/api/employer/getallposts/${userInfo._id}`, {
        method: "GET",
      }).then(async (res) => {
        const data = await res.json();
        setTimeout(() => {
          setMyPosts(data.posts);
          setTotalPages(Math.ceil(data.posts.length / itemsPerPage));
          if (data.posts.length == 0) {
            setloading(false);
          }
          console.log("my" + data);
        }, 2000);
      });
    }

    fetchMyPost();
  }, []);

  return (
    <div className="py-16 ">
      <div>
        <div className="pt-10 text-center text-2xl font-bold">
          Welcome {userInfo.company_name}
        </div>

        <div className="flex md:flex-row flex-col md:px-20 px-2 py-10  gap-10">
          <div className="flex-1 border  rounded-lg shadow-lg p-10 bg-gradient-to-l from-black">
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-10 items-center ">
                <div className="bg-black p-6 rounded-full">
                  <FaBriefcase size={30} color="white" />
                </div>{" "}
                <div className="text-3xl font-semibold text-white">
                  JOB POSTED
                </div>
              </div>

              <div className="text-3xl font-bold text-white ">
                {MyPosts.length}{" "}
              </div>
            </div>
          </div>
          <div className="flex-1 border  rounded-lg shadow-lg p-10 bg-gradient-to-l from-black">
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-10 items-center ">
                <div className="bg-black p-6 rounded-full">
                  <FaCalendarCheck size={30} color="white" />
                </div>{" "}
                <div className="text-3xl font-semibold text-white">
                  ACTIVE JOBS
                </div>
              </div>

              <div className="text-3xl font-bold text-white ">
                {MyPosts.length}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="md:px-20 px-2 text-3xl font-bold pb-10">YOUR JOBS</div>
        {MyPosts.length == 0 ? (
          loading ? (
            <div className="md:px-20 px-2 gap-10 md:w-1/2 rounded-lg">
              <Skeleton count={5} height={30} />
              <Skeleton count={5} height={30} />
            </div>
          ) : (
            <div className="md:px-20 px-2 gap-10 md:w-1/2 rounded-lg">
              {" "}
              No job posted yet
            </div>
          )
        ) : (
          // <div className="px-20 gap-10 w-1/2 rounded-lg">
          //   <Skeleton count={5} height={30} />
          //   <Skeleton count={5} height={30} />
          // </div>
          <>
            <div className="flex flex-wrap md:px-20 px-2 gap-10">
              {subset.map((post, id) => (
                <li
                  key={id}
                  // onClick={() => {
                  //   navigate(`/post/${post._id}`);
                  // }}
                  className="list-none md:w-2/5 w-full border border-black rounded-lg hover:shadow-lg bg-white"
                >
                  <div className="flex flex-col   p-3 gap-3">
                    <div className="text-2xl">{post.job_title}</div>
                    <div className="flex text-xl items-center gap-2">
                      <FaClock /> <p>{post.deadline}</p>
                    </div>
                    <div className="pt-5 flex flex-row justify-between">
                      <Link to={`/editjob/${post._id}`}>
                        <button className="w-fit p-2 bg-black text-white rounded-lg">
                          Edit
                        </button>
                      </Link>
                      <Link to={`/post/${post._id}`}>
                        <div className="w-fit p-2 bg-black text-white rounded-lg">
                          Detail
                        </div>{" "}
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </div>

            <ReactPaginate
              containerClassName={
                "flex flex-row py-10 px-20  justify-center gap-3 text-xl"
              }
              breakLabel="..."
              nextLabel="next >"
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              forcePage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
