/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Issue = "issue",
  Post = "post",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export enum IssueStatusOptions {
  "OPEN" = "OPEN",
  "IN_PROGRESS" = "IN_PROGRESS",
  "CLOSED" = "CLOSED",
}
export type IssueRecord = {
  id: string;
  description: string;
  status: IssueStatusOptions;
  title: string;
  created: string;
};

export type PostRecord = {
  body: string;
  title: string;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type IssueResponse<Texpand = unknown> = Required<IssueRecord> &
  BaseSystemFields<Texpand>;
export type PostResponse<Texpand = unknown> = Required<PostRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  issue: IssueRecord;
  post: PostRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  issue: IssueResponse;
  post: PostResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "issue"): RecordService<IssueResponse>;
  collection(idOrName: "post"): RecordService<PostResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
