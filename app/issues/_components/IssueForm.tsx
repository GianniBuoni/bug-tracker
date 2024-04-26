"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IssueRecord, IssueStatusOptions } from "@/pocketbase-types";
import { useRouter } from "next/navigation";
import IssueErrorFlag from "./IssueErrorFlag";
import IssueFormErrorMessage from "./IssueFormErrorMessage";
import Spinner from "@/app/_components/Spinner";

interface Props {
  originalData?: IssueRecord;
}

const IssueForm = ({ originalData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IssueRecord>();

  const onSubmit = async (data: IssueRecord) => {
    try {
      setLoading(true);
      if (originalData) {
        await axios.patch("/api/issues/" + originalData.id, data);
        router.push(`/issues/${originalData?.id}`);
      } else {
        await axios.post("/api/issues/", data);
        router.push("/issues/");
      }
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError("An unexpected server error occurred.");
    }
  };

  const statusColorMap: Record<
    IssueStatusOptions,
    {
      color: string;
    }
  > = {
    OPEN: { color: "bg-error" },
    IN_PROGRESS: { color: "bg-warning" },
    CLOSED: { color: "bg-accent" },
  };

  const statusBg = () => {
    try {
      const watchedStatusColor = statusColorMap[watch("status")].color;
      return watchedStatusColor;
    } catch (error) {
      return statusColorMap[originalData?.status!].color;
    }
  };

  return (
    <form className="card md:w-3/5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      {error && <IssueErrorFlag>{error}</IssueErrorFlag>}
      {originalData && (
        <select
          defaultValue={originalData.status}
          className={`select text-base-300 transition-colors ${statusBg()}`}
          {...register("status")}
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS"> In progress</option>
          <option value="CLOSED"> Closed</option>
        </select>
      )}
      <input
        className="input bg-base-300"
        type="text"
        placeholder="Title"
        defaultValue={originalData?.title}
        {...register("title", { required: "A title is required." })}
      />
      {errors.title && (
        <IssueFormErrorMessage>{errors.title.message}</IssueFormErrorMessage>
      )}
      <textarea
        rows={15}
        className="card card-body p-3"
        defaultValue={originalData?.description}
        placeholder="Describe the issue. You can use Markdown!"
        {...register("description", { required: "A description is required." })}
      />
      {errors.description && (
        <IssueFormErrorMessage>
          {errors.description.message}
        </IssueFormErrorMessage>
      )}
      <button type="submit" disabled={loading} className="btn btn-primary">
        {originalData ? "Update" : "Submit"}
        {loading && <Spinner />}
      </button>
    </form>
  );
};

export default IssueForm;
