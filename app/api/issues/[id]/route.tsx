import { nowDate } from "@/app/_lib/nowDate";
import { issueSchema } from "@/app/_lib/validationSchemas";
import prisma from "@/prisma/client";
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
    const updatedIssue = await prisma.issues.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        updated: nowDate,
      },
    });
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
    await prisma.issues.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: "This issue does not exist." },
      { status: 404 }
    );
  }
}
