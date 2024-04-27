import { IssueRecord } from "@/app/_lib/definitions";
import React from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueTimeStamp from "./IssueTimeStamp";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const IssueDescription = ({ issue }: { issue: IssueRecord }) => {
  return (
    <div className="card card-bordered bg-base-300 p-2 col-span-3">
      <h1 className="p-5">{issue.title}</h1>
      <div className="border-y-2 px-5 py-5 space-y-2 md:flex md:space-y-0 md:space-x-5 items-center">
        <IssueStatusBadge status={issue.status} />
        <div className="md:flex mt-0">
          <p>Last Updated:&emsp;</p>
          <IssueTimeStamp rawDate={issue.updated} />
        </div>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="p-5 prose">
        {issue.description}
      </ReactMarkdown>
    </div>
  );
};

export default IssueDescription;
