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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue: IssueRecord = await fetch(
    `${process.env.PB_HOST}/api/collections/issue/records/${params.id}`
  ).then((res) => res.json());

  return {
    title: "Edit " + issue.title,
    description: issue.description,
  };
}
