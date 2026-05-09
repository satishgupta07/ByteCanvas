import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import Loader from "../components/Loader";

function Home() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((result) => {
        if (result) setPosts(result.documents);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  /* ── Empty state ─────────────────────────────────────────────────────────── */
  if (posts.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Container>
          <div className="text-center py-20">
            {/* Pencil icon placeholder */}
            <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No stories published yet
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Be the first to share your ideas with the world.
            </p>
            <Link
              to="/add-post"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white
                         font-semibold text-sm rounded-lg shadow-sm
                         hover:bg-indigo-700 transition-colors duration-200"
            >
              Start writing
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  /* ── Posts grid ──────────────────────────────────────────────────────────── */
  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Section heading */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Stories &amp; Ideas
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Discover articles from the ByteCanvas community
          </p>
        </div>

        {/* Responsive grid: 1 → 2 → 3 → 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
