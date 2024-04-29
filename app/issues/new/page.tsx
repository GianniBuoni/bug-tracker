import React from "react";
import IssueForm from "../_components/IssueForm";
import { Metadata } from "next";

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
export const metadata: Metadata = {
  title: "Issue Tracker | New Issue",
  description: "Submit a new issue.",
};
