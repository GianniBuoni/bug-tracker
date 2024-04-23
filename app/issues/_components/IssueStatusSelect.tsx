import { IssueStatusOptions } from "@/pocketbase-types";
import React, { useState } from "react";

const IssueStatusSelect = () => {
  const statuses = [
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "CLOSED", label: "Closed" },
  ];

  return (
    <select className="select mb-3 bg-base-300" defaultValue="DEFAULT">
      <option disabled value="DEFAULT">
        Edit Status
      </option>
      {statuses.map((status) => (
        <option value={status.value}>{status.label}</option>
      ))}
    </select>
  );
};

export default IssueStatusSelect;
