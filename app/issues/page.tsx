import React from "react";
import IssuesTable from "./_components/IssuesTable";
import Link from "next/link";
import IssuesPageFilter from "./_components/IssuesPageFilter";
import { IssueStatusOptions } from "@/pocketbase-types";

interface Props {
  searchParams: { status: IssueStatusOptions };
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <>
      <h1>Current Issues</h1>
      <div className="flex md:justify-between space-x-3 my-3">
        <IssuesPageFilter defaultValue={searchParams.status} />
        <Link href="/issues/new">
          <button className="btn btn-primary">New Issue</button>
        </Link>
      </div>
      <IssuesTable params={searchParams} />
    </>
  );
};

export default IssuesPage;
