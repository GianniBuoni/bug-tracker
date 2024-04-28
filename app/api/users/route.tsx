import { pb } from "@/app/_services/pb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(response: NextRequest) {
  const users = await pb.collection("users").getFullList({
    fields: "username,email,name,id",
    sort: "name",
  });
  return NextResponse.json(users);
}
