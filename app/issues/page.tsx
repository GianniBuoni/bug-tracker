import { IssueRecord, IssueStatusOptions } from "@/pocketbase-types";
import Link from "next/link";
import { RecordFullListOptions } from "pocketbase";
import Pagination from "../_components/Pagination";
import IssuesPageFilter from "./_components/IssuesPageFilter";
import IssuesTable from "./_components/IssuesTable";
import { pb } from "../_services/pb";

interface Props {
  searchParams: {
    status: IssueStatusOptions;
    orderBy: keyof IssueRecord;
    page: string;
  };
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
  const pageSize = 7;

  const issues = await pb
    .collection("issue")
    .getList(page, pageSize, { ...getOptions, cache: "no-store" });

  const fullIssueList = await pb
    .collection("issue")
    .getFullList({ ...getOptions, cache: "no-store" });

  const itemCount = fullIssueList.length;
  console.log(itemCount);

  return (
    <>
      <h1>Current Issues</h1>
      <div className="flex md:justify-between space-x-3 my-3">
        <IssuesPageFilter defaultValue={searchParams.status} />
        <Link href="/issues/new">
          <button className="btn btn-primary">New Issue</button>
        </Link>
      </div>
      <IssuesTable
        searchParams={searchParams}
        issueMap={issues.items}
        page={page}
        pageSize={pageSize}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={itemCount}
      />
    </>
  );
};

export default IssuesPage;
