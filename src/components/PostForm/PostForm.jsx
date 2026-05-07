import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate   = useNavigate();
  const userData   = useSelector((state) => state.auth.userData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title:   post?.title   || "",
        slug:    post?.$id     || "",
        content: post?.content || "",
        status:  post?.status  || "active",
      },
    });

  /* Auto-generate URL-safe slug from the title */
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      if (post) {
        /* ── Edit existing post ─── */
        let newFileId;
        if (data.image[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (!file) throw new Error("Image upload failed. Please try again.");
          /* Delete the old image only after the new one is confirmed uploaded */
          appwriteService.deleteFile(post.featuredImage);
          newFileId = file.$id;
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          /* Only override featuredImage when a new file was uploaded */
          ...(newFileId && { featuredImage: newFileId }),
        });

        if (!dbPost) throw new Error("Failed to update post. Please try again.");
        navigate(`/post/${dbPost.$id}`);
      } else {
        /* ── Create new post ─── */
        const file = await appwriteService.uploadFile(data.image[0]);
        /* uploadFile returns false on failure instead of throwing — surface the error */
        if (!file) throw new Error("Image upload failed. Please try again.");

        data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (!dbPost) throw new Error("Failed to publish post. Please try again.");
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* Error banner */}
      {submitError && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Left column: content ─────────────────────────────────────────── */}
        <div className="flex-1 space-y-5">
          <Input
            label="Title"
            placeholder="Give your post a title"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug"
            placeholder="url-friendly-slug"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* ── Right column: meta ───────────────────────────────────────────── */}
        <div className="w-full lg:w-72 xl:w-80 space-y-5">
          {/* Featured image upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="w-full text-sm text-slate-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:font-medium file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100 cursor-pointer
                         border border-slate-300 rounded-lg px-2 py-1.5"
              {...register("image", { required: !post })}
            />
          </div>

          {/* Current image preview when editing */}
          {post && (
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            variant={post ? "success" : "primary"}
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting
              ? post ? "Updating…" : "Publishing…"
              : post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
