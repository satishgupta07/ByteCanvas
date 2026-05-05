import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller } from "react-hook-form";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list", "indent",
  "align",
  "link", "image", "video",
  "blockquote", "code-block",
];

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}

      <div className="rounded-lg overflow-hidden border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactQuill
              theme="snow"
              value={value ?? defaultValue}
              onChange={onChange}
              modules={modules}
              formats={formats}
              style={{ height: 420 }}
            />
          )}
        />
      </div>
    </div>
  );
}
