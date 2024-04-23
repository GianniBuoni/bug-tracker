"use client";

import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import IssueFormErrorMessage from "./IssueFormErrorMessage";
import axios from "axios";
import IssueErrorFlag from "./IssueErrorFlag";
import { IssueRecord } from "@/pocketbase-types";
import IssueStatusSelect from "./IssueStatusSelect";

type IssueData = z.infer<typeof issueSchema>;

interface Props {
  originalData?: IssueRecord;
}

const IssueForm = ({ originalData }: Props) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueData>({ resolver: zodResolver(issueSchema) });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: IssueData) => {
    try {
      setLoading(true);
      if (originalData) {
        await axios.patch("/api/issues/" + originalData.id, data);
      } else {
        await axios.post("/api/issues/", data);
      }
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
      {originalData && <IssueStatusSelect />}
      <input
        defaultValue={originalData?.title}
        placeholder="Title"
        className="input bg-base-300 mb-3"
        {...register("title")}
      ></input>
      {errors.title && (
        <IssueFormErrorMessage>{errors.title.message}</IssueFormErrorMessage>
      )}
      <textarea
        defaultValue={originalData?.description}
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
        {originalData ? "Update" : "Submit"}
        {isLoading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </button>
    </form>
  );
};

export default IssueForm;
