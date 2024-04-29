import { IssueRecord, IssueStatusOptions } from "@/pocketbase-types";
import Link from "next/link";
import { ListResult, RecordFullListOptions } from "pocketbase";
import Pagination from "../_components/Pagination";
import IssuesPageFilter from "./_components/IssuesPageFilter";
import IssuesTable from "./_components/IssuesTable";
import { pb } from "../_services/pb";
import { Metadata } from "next";

export interface IssueQuery {
  status: IssueStatusOptions;
  orderBy: keyof IssueRecord;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statusFilter = searchParams.status
    ? { filter: `status='${searchParams.status}'` }
    : undefined;

  const orderBy = searchParams.orderBy
    ? { sort: `${searchParams.orderBy}` }
    : { sort: "-created" };

  const getOptions: RecordFullListOptions = Object.assign(
    {},
    statusFilter,
    orderBy
  );

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 8;

  const issues: ListResult<IssueRecord> = await pb
    .collection("issue")
    .getList(page, pageSize, { ...getOptions, cache: "no-store" });

  const fullIssueList = await pb
    .collection("issue")
    .getFullList({ ...getOptions, cache: "no-store" });

  const itemCount = fullIssueList.length;

  return (
    <>
      <h1>Current Issues</h1>
      <div className="flex md:justify-between space-x-3 my-3">
        <IssuesPageFilter defaultValue={searchParams.status} />
        <Link href="/issues/new">
          <button className="btn btn-primary">New Issue</button>
        </Link>
      </div>
      <IssuesTable searchParams={searchParams} issue={issues.items} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={itemCount}
      />
    </>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker | Issues",
  description: "View a list of project issues.",
};
