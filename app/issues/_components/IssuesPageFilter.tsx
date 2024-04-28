"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import IssueStatusSelectOptions from "./IssueStatusSelectOptions";

const IssuesPageFilter = () => {
  const router = useRouter();
  const { register, watch } = useForm();
  const currentStatus = watch("status");

  const handleChange = (data: string) => {
    const query = data ? `?status=${data}` : "";
    router.push("/issues" + query);
  };

  return (
    <select
      className="select bg-base-300"
      defaultValue="disabled"
      {...register("status")}
      onChange={(currentStatus) => handleChange(currentStatus.target.value)}
    >
      <option value="disabled" disabled>
        Filter by Status
      </option>
      <option value="">All</option>
      <IssueStatusSelectOptions />
    </select>
  );
};

export default IssuesPageFilter;
