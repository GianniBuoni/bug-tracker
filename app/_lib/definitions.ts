// These are the old Pocketbase Types—still useful for more advanced type safety that Prima can't give.

export enum IssueStatusOptions {
  "OPEN" = "OPEN",
  "IN_PROGRESS" = "IN_PROGRESS",
  "CLOSED" = "CLOSED",
}
export type IssueRecord = {
  id: number;
  description: string;
  status: IssueStatusOptions;
  title: string;
  created: string;
  updated: string;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
  username: string;
  email: string;
  password: string;
  identity: UsersRecord["email"] | UsersRecord["password"];
};
