import React from "react";
import { IssueRecord, IssueStatusOptions } from "@/pocketbase-types";

const statusMap: Record<
  IssueStatusOptions,
  {
    label: string;
    color: "badge-accent" | "badge-warning" | "badge-error";
  }
> = {
  OPEN: { label: "Open", color: "badge-error" },
  IN_PROGRESS: { label: "In Progress", color: "badge-warning" },
  CLOSED: { label: "Closed", color: "badge-accent" },
};

const IssueStatusBadge = ({ status }: { status: IssueStatusOptions }) => {
  return (
    <p className={`badge ${statusMap[status].color}`}>
      {statusMap[status].label}
    </p>
  );
};

export default IssueStatusBadge;
