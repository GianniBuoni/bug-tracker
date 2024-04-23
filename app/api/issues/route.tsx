import { NextResponse, NextRequest } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { pb } from "@/app/_services/pb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newIssue = await pb.collection("issue").create({
    title: body.title,
    description: body.description,
    status: "OPEN",
  });
  return NextResponse.json(newIssue, { status: 201 });
}
