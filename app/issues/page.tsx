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
      <div className="flex justify-between">
        <div className="flex space-x-5">
          <h1>Current Issues</h1>
          <IssuesPageFilter />
        </div>
        <Link href="/issues/new">
          <button className="btn btn-primary">New Issue</button>
        </Link>
      </div>

      <IssuesTable status={searchParams.status} />
    </>
  );
};

export default IssuesPage;
