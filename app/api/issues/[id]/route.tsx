import { pb } from "@/app/_services/pb";
import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    const issue = await pb.collection("issue").getOne(params.id);
    const updatedIssue = await pb.collection("issue").update(issue.id, body);
    return NextResponse.json(updatedIssue);
  } catch (error) {
    return NextResponse.json(
      { error: "This issue does not exist." },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issue = await pb.collection("issue").getOne(params.id);
    const updatedIssue = await pb.collection("issue").delete(issue.id);
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: "This issue does not exist." },
      { status: 404 }
    );
  }
}
