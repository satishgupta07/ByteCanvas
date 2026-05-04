import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-10">
      <Container>
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Write a new post</h1>
          <p className="mt-1 text-sm text-slate-500">
            Share your ideas, stories, and insights with the world.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-8" />

        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
