"use client";
import { useRouter } from "next/navigation";

import React from "react";

enum ButtonActions {
  CREATE = 1,
  UPDATE,
  DELETE,
}

const actionMap: Record<
  ButtonActions,
  {
    label: string;
    route: string;
    color: "btn-primary" | "btn-warning" | "btn-error";
  }
> = {
  "1": { label: "New", route: "/issues/new", color: "btn-primary" },
  "2": { label: "Edit", route: "edit", color: "btn-warning" },
  "3": { label: "Delete", route: "delete", color: "btn-error" },
};

interface Props {
  id?: string;
  input: ButtonActions;
}

const IssueActionButton = ({ id, input }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    if (id) router.push(`${id}/${actionMap[input].route}`);
    else router.push(`${actionMap[input].route}`);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`btn btn-block ${actionMap[input].color}`}
      >
        {actionMap[input].label} Issue
      </button>
    </div>
  );
};

export default IssueActionButton;
