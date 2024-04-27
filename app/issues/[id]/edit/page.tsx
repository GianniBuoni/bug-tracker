import IssueForm from "@/app/issues/_components/IssueForm";
import prisma from "@/prisma/client";

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(params.id) },
  });
  return <IssueForm originalData={issue} />;
};

export default IssueEditPage;
