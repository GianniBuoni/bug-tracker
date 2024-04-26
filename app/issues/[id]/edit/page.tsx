import { pb } from "@/app/_services/pb";
import IssueForm from "@/app/issues/_components/IssueForm";
import { notFound } from "next/navigation";
import { IssueRecord } from "@/pocketbase-types";

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  let issue: IssueRecord = null!;
  try {
    issue = await pb.collection("issue").getOne(params.id, {
      cache: "no-store",
    });
  } catch (error) {
    notFound();
  }
  return <IssueForm originalData={issue} />;
};

export default IssueEditPage;
