import React from "react";
import IssuesTable from "./_components/IssuesTable";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1>Current Issues</h1>
        <Link href="/issues/new">
          <button className="btn btn-primary">New Issue</button>
        </Link>
      </div>

      <IssuesTable />
    </>
  );
};

export default IssuesPage;
