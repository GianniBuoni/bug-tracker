"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import IssueStatusSelectOptions from "./IssueStatusSelectOptions";
import { IssueStatusOptions } from "@/pocketbase-types";

interface Props {
  defaultValue: IssueStatusOptions;
}

const IssuesPageFilter = ({ defaultValue }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, watch } = useForm();
  const currentStatus = watch("status");

  const handleChange = (data: string) => {
    const params = new URLSearchParams();
    if (data) params.append("status", data);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";
    router.push("/issues" + query);
  };

  return (
    <select
      className="select bg-base-300"
      defaultValue={defaultValue ? `${defaultValue}` : "disabled"}
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
