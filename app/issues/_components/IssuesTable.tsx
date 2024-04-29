import { IssueRecord, IssueStatusOptions } from "@/pocketbase-types";
import IssueStatusBadge from "./IssueStatusBadge";
import Link from "next/link";
import IssueTimeStamp from "./IssueTimeStamp";
import { GoDotFill } from "react-icons/go";
import { IssueQuery } from "../page";

interface Props {
  searchParams: IssueQuery;
  issue: IssueRecord[];
}

const IssuesTable = async ({ searchParams, issue }: Props) => {
  const columns: {
    label: string;
    value: keyof IssueRecord;
    className?: "hidden md:table-cell";
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Date Created",
      value: "created",
      className: "hidden md:table-cell",
    },
    {
      label: "Last Updated",
      value: "updated",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <div className="card bg-base-300">
      <table className="table table-zebra">
        <thead className="text-xl">
          <tr>
            {columns.map((column) => (
              <th key={column.value} className={column.className}>
                <div className="flex items-center space-x-1">
                  <Link
                    href={{ query: { ...searchParams, orderBy: column.value } }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy && (
                    <GoDotFill className="text-primary" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {issue.map((issue) => (
            <tr key={issue.id}>
              <td>
                <Link
                  href={`/issues/${issue.id}`}
                  className="link link-primary"
                >
                  {issue.title}
                </Link>
                <div className="mt-1 md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </td>
              <td className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </td>
              <td className="hidden md:table-cell">
                <IssueTimeStamp rawDate={issue.created} />
              </td>
              <td className="hidden md:table-cell">
                <IssueTimeStamp rawDate={issue.updated} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
