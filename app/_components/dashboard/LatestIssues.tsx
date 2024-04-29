import { pb } from "@/app/_services/pb";
import IssueStatusBadge from "@/app/issues/_components/IssueStatusBadge";
import { IssueRecord } from "@/pocketbase-types";
import Link from "next/link";
import { ListResult } from "pocketbase";

const LatestIssues = async () => {
  const latestIssues: ListResult<IssueRecord> = await pb
    .collection("issue")
    .getList(1, 5, {
      sort: "-created",
    });
  return (
    <div className="card bg-base-300">
      <table className="table table-zebra">
        <thead className="text-xl">
          <tr>
            <th>Latest Issues</th>
          </tr>
        </thead>
        <tbody>
          {latestIssues.items.map((issue) => (
            <tr key={issue.id}>
              <td className="flex flex-col space-y-2">
                <Link href={`issues/${issue.id}`} className="link link-primary">
                  {issue.title}
                </Link>
                <IssueStatusBadge status={issue.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestIssues;
