import React, { PropsWithChildren } from "react";

const IssueFormErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="text-error text-sm mb-5 ml-1">{children}</p>;
};

export default IssueFormErrorMessage;
