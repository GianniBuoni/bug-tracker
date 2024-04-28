import { pb } from "@/app/_services/pb";
import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextAuth } from "../../auth/[...nextauth]/route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(nextAuth);
  if (!session)
    return NextResponse.json({ message: "Please log in." }, { status: 401 });

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
  const session = await getServerSession(nextAuth);
  if (!session)
    return NextResponse.json({ message: "Please log in." }, { status: 401 });

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
