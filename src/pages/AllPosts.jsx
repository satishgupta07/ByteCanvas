import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { Container, PostCard } from "../components";
import Loader from "../components/Loader";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.$id) return;

    /* Fetch only the current user's posts (active + inactive) */
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((result) => {
        if (result) setPosts(result.documents);
      })
      .finally(() => setLoading(false));
  }, [userData]);

  if (loading) return <Loader />;

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Posts</h1>
            <p className="mt-1 text-sm text-slate-500">
              {posts.length === 0
                ? "You haven't written anything yet."
                : `${posts.length} post${posts.length !== 1 ? "s" : ""} published`}
            </p>
          </div>

          <Link
            to="/add-post"
            className="inline-flex items-center gap-2 px-4 py-2.5
                       bg-indigo-600 text-white text-sm font-semibold rounded-lg
                       hover:bg-indigo-700 transition-colors duration-200 self-start"
          >
            {/* Plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            New Post
          </Link>
        </div>

        {/* Empty state */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-slate-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75-6.75a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No posts yet. Start writing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
