import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import Loader from "../components/Loader";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const userData   = useSelector((state) => state.auth.userData);

  /* Only the author sees edit/delete controls */
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) { navigate("/"); return; }

    appwriteService
      .getPost(slug)
      .then((result) => {
        if (result) setPost(result);
        else navigate("/");
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) return <Loader />;
  if (!post)   return null;

  return (
    <div className="py-10">
      <Container>
        {/* ── Featured image ───────────────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl overflow-hidden bg-slate-100 max-h-[480px]">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />

          {/* Author action bar (edit / delete) */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="success" size="sm">
                  Edit
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* ── Post content — constrained for readability ───────────────────── */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
            {post.title}
          </h1>

          {/* Rendered HTML from TinyMCE */}
          <div className="prose-content">
            {parse(post.content)}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25H13.25A.75.75 0 0 1 14 8Z"
                  clipRule="evenodd"
                />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
