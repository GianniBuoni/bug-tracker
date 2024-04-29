import { IssueStatusOptions } from "@/pocketbase-types";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: IssueStatusOptions;
    color: "bg-primary" | "bg-error" | "bg-warning";
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: IssueStatusOptions.OPEN,
      color: "bg-error",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: IssueStatusOptions.IN_PROGRESS,
      color: "bg-warning",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: IssueStatusOptions.CLOSED,
      color: "bg-primary",
    },
  ];
  return (
    <div className="flex space-x-3">
      {containers.map((container) => (
        <div
          className={`card h-25 text-primary-content ${container.color}`}
          key={container.label}
        >
          <div className="flex flex-col card-body">
            <Link href={`issues?status=${container.status}`}>
              {container.label}
            </Link>
            <p className="text-xl font-extrabold">{container.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueSummary;
