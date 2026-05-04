import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import Loader from "../components/Loader";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

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

  if (loading) return <Loader />;
  if (!post)   return null;

  return (
    <div className="py-10">
      <Container>
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Edit post</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your post content, image, or status.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-8" />

        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
