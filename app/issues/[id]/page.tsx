import { pb } from "@/app/_services/pb";
import { IssueRecord } from "@/pocketbase-types";
import { notFound } from "next/navigation";
import IssueActionButton from "../_components/IssueActionButton";
import IssueDescription from "../_components/IssueDescription";
import IssueDelete from "../_components/IssueDelete";
import IssueAssign from "../_components/IssueAssign";
import { title } from "process";

interface Props {
  params: { id: string };
}

const IssueDescriptionPage = async ({ params }: Props) => {
  let issue: IssueRecord = null!;
  try {
    issue = await pb
      .collection("issue")
      .getOne(params.id, { cache: "no-cache" });
  } catch (error) {
    notFound();
  }

  return (
    <div className="md:grid grid-cols-5 gap-4 space-y-3">
      <IssueDescription issue={issue} />
      <div className="space-y-2">
        <IssueAssign />
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

export async function generateMetadata({ params }: Props) {
  const issue: IssueRecord = await fetch(
    `${process.env.PB_HOST}/api/collections/issue/records/${params.id}`
  ).then((res) => res.json());

  return {
    title: "Issue Tracker | " + issue.title,
    description: issue.description,
  };
}
