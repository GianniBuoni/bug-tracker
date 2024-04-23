"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const IssueForm = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  return (
    <form className="card card-bordered md:w-3/5">
      <input placeholder="Title" className="input bg-base-200 mb-3"></input>
      <SimpleMDE placeholder="Describe the issue. This text editor notates everything in Markdown." />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default IssueForm;
