import { IssueRecord } from "@/pocketbase-types";
import React from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueTimeStamp from "./IssueTimeStamp";
import Markdown from "react-markdown";

const IssueDescription = ({ issue }: { issue: IssueRecord }) => {
  return (
    <>
      <h1>{issue.title}</h1>
      <div className="flex items-center space-x-5 mb-5">
        <IssueStatusBadge status={issue.status} />
        <p>
          Last Updated:&emsp;
          <IssueTimeStamp rawDate={issue.updated} />
        </p>
      </div>
      <Markdown className="card card-bordered p-5 prose bg-base-300">
        {issue.description}
      </Markdown>
    </>
  );
};

export default IssueDescription;
