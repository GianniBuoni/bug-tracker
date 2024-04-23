import { pb } from "@/app/_services/pb";
import { IssueRecord } from "@/pocketbase-types";
import { notFound } from "next/navigation";
import IssueActionButton from "../_components/IssueActionButton";
import IssueDescription from "../_components/IssueDescription";

const IssueDescriptionPage = async ({ params }: { params: IssueRecord }) => {
  let issue: IssueRecord = null!;
  try {
    issue = await pb
      .collection("issue")
      .getOne(params.id, { cache: "no-cache" });
  } catch (error) {
    notFound();
  }

  return (
    <div className="md:grid grid-cols-2 gap-4 space-y-3">
      <IssueDescription issue={issue} />
      <div className="space-y-2">
        <IssueActionButton input={1} />
        <IssueActionButton id={issue.id} input={2} />
        <IssueActionButton id={issue.id} input={3} />
      </div>
    </div>
  );
};

export default IssueDescriptionPage;
