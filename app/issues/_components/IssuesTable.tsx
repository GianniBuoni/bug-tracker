import { pb } from "@/app/_services/pb";
import { IssueRecord } from "@/pocketbase-types";
import IssueStatusBadge from "./IssueStatusBadge";
import { useReadableDate } from "@/app/_hooks/useReadableDate";
import Link from "next/link";
import IssueTimeStamp from "./IssueTimeStamp";

//TODO: Make a className for all card components

const IssuesTable = async () => {
  const issues: IssueRecord[] = await pb
    .collection("issue")
    .getFullList({ sort: "-created", cache: "no-cache" });

  return (
    <div className="card card-bordered bg-base-300">
      <table className="table table-pin-rows table-zebra">
        <thead className="text-xl">
          <tr>
            <th>Title</th>
            <th className="hidden md:table-cell">Status</th>
            <th className="hidden md:table-cell">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
