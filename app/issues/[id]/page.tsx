import { IssueRecord } from "@/app/_lib/definitions";
import { notFound } from "next/navigation";
import IssueActionButton from "../_components/IssueActionButton";
import IssueDescription from "../_components/IssueDescription";
import IssueDelete from "../_components/IssueDelete";
import { issues } from "@prisma/client";
import prisma from "@/prisma/client";

const IssueDescriptionPage = async ({ params }: { params: issues }) => {
  const issue = await prisma.issues.findUniqueOrThrow({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <div className="md:grid grid-cols-5 gap-4 space-y-3">
      <IssueDescription issue={issue} />
      <div className="space-y-2">
        <IssueActionButton
          color="btn-primary"
          label="New"
          route="/issues/new"
        />
        <IssueActionButton
          color="btn-warning"
          label="Edit"
          route={`${issue.id}/edit`}
        />
        <IssueDelete id={issue.id} />
      </div>
    </div>
  );
};

export default IssueDescriptionPage;
