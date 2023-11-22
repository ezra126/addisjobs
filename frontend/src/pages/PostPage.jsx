import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPost() {
      const data = await fetch(`/api/employer/getpost/${params.postId}`, {
        method: "GET",
      });
      const body = await data.json();
      setPost(body);
      console.log(post);
    }

    fetchPost();
  }, []);

  return (
    <div className="pt-20">
      <div className="mx-20  bg-white shadow-lg p-10">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-semibold">{post?.post?.job_title}</div>
          <div className="flex flex-row items-center gap-10">
            <div className="text-xl">{post?.post?.employement_type}</div>
            <div className="text-xl">Payment:{post?.post?.payment}</div>
          </div>
          <div className="flex flex-col">
            <h1>Job Description</h1>

            <div
              dangerouslySetInnerHTML={{
                __html: `${post?.post?.job_description}`,
              }}
            ></div>
          </div>

          <div className="flex flex-row items-center gap-10">
            <div className="text-xl">
              Work Location - {post?.post?.work_location}
            </div>
            {/* <div className="text-xl">Payment:{post?.post?.payment}</div> */}
          </div>

          <div className="flex justify-end rounded-lg">
            <button
              onClick={() => {
                navigate(`/editjob/${params.postId}`);
              }}
              className="px-4 py-2 bg-black text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
