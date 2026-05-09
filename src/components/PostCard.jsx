import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

/**
 * Blog post preview card.
 * Shows a 16:9 featured image, title, and a subtle hover lift effect.
 */
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article
        className="h-full bg-white rounded-xl overflow-hidden
                   border border-slate-100
                   shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                   hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                   hover:-translate-y-0.5
                   transition-all duration-300"
      >
        {/* Featured image — forced 16:9 */}
        <div className="aspect-video overflow-hidden bg-slate-100">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Card body */}
        <div className="p-5">
          <h2
            className="font-semibold text-slate-900 leading-snug
                       line-clamp-2
                       group-hover:text-indigo-600 transition-colors duration-200"
          >
            {title}
          </h2>

          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
            Read article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                fillRule="evenodd"
                d="M2 8a.75.75 0 0 1 .75-.75h8.69L9.22 5.03a.75.75 0 0 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H2.75A.75.75 0 0 1 2 8Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
