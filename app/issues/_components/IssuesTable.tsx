import IssueStatusBadge from "./IssueStatusBadge";
import Link from "next/link";
import IssueTimeStamp from "./IssueTimeStamp";
import prisma from "@/prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const IssuesTable = async () => {
  const issues = await prisma.issues.findMany();
  noStore();

  return (
    <div className="card card-bordered bg-base-300">
      <table className="table table-pin-rows table-zebra">
        <thead className="text-xl">
          <tr>
            <th>Title</th>
            <th className="hidden md:table-cell">Status</th>
            <th className="hidden md:table-cell">Date Created</th>
            <th className="hidden md:table-cell">Last Updated</th>
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
