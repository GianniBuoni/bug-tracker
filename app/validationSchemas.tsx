import z from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, { message: "A title is required." }).max(255),
  description: z.string().min(1, { message: "A description is required" }),
});

export const userSchema = z.object({
  identity: z.string(),
  password: z.string().min(8),
});
