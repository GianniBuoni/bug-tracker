import React from "react";
import IssueDescription from "../_components/IssueDescription";
import { pb } from "@/app/_services/pb";
import { IssueRecord } from "@/pocketbase-types";
import { notFound } from "next/navigation";

const IssueDescriptionPage = async ({ params }: { params: IssueRecord }) => {
  let issue: IssueRecord = null!;
  try {
    issue = await pb.collection("issue").getOne(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <>
      <IssueDescription issue={issue} />
    </>
  );
};

export default IssueDescriptionPage;
