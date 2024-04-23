import React, { PropsWithChildren } from "react";

const IssueFormErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="text-error text-sm mb-3">{children}</p>;
};

export default IssueFormErrorMessage;
