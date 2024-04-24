"use client";

import { useRouter } from "next/navigation";

interface Props {
  route: string;
  label: string;
  color: "btn-primary" | "btn-warning" | "btn-error";
}

const IssueActionButton = ({ route, label, color }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(route);
  };
  return (
    <div>
      <button onClick={handleClick} className={`btn btn-block ${color}`}>
        {label} Issue
      </button>
    </div>
  );
};

export default IssueActionButton;
