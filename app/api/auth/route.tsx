import { UsersRecord } from "@/pocketbase-types";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "../../validationSchemas";
import { pb } from "../../_services/pb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(body.identity, body.password);
    return NextResponse.json(authData);
  } catch (error) {
    return NextResponse.json(
      { error: "This user does not exist." },
      { status: 404 }
    );
  }
}
