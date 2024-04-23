"use client";

import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import IssueFormErrorMessage from "./IssueFormErrorMessage";
import axios from "axios";
import IssueErrorFlag from "./IssueErrorFlag";

type NewIssueData = z.infer<typeof createIssueSchema>;

const IssueForm = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueData>({ resolver: zodResolver(createIssueSchema) });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: NewIssueData) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post("/api/issues/", data);
      router.push("/issues");
      //THROW ERROR
    } catch (error) {
      setLoading(false);
      setError("An unexpected server error occurred.");
    }
  };

  return (
    <form className="card md:w-3/5" onSubmit={handleSubmit(onSubmit)}>
      {error && <IssueErrorFlag>{error}</IssueErrorFlag>}
      <input
        placeholder="Title"
        className="input bg-base-300 mb-3"
        {...register("title")}
      ></input>
      {errors.title && (
        <IssueFormErrorMessage>{errors.title.message}</IssueFormErrorMessage>
      )}
      <textarea
        placeholder="Describe the issue. Please use Markdown notation!"
        rows={15}
        className="card card-body p-3"
        {...register("description")}
      ></textarea>
      {
        <IssueFormErrorMessage>
          {errors.description?.message}
        </IssueFormErrorMessage>
      }
      <button type="submit" disabled={isLoading} className="btn btn-primary">
        Submit
        {isLoading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </button>
    </form>
  );
};

export default IssueForm;
