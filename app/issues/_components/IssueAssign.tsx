"use client";
import { UsersRecord } from "@/pocketbase-types";
import axios from "axios";
import { useEffect, useState } from "react";

const IssueAssign = () => {
  const [users, setUsers] = useState<UsersRecord[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get<UsersRecord[]>("/api/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <select
      name=""
      id=""
      className="select w-full bg-base-300"
      defaultValue="default"
    >
      <option value="default" disabled className="text-center">
        Assign the Issue
      </option>
      {users.map((user) => (
        <option key={user.id} value={user.id} className="text-center">
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default IssueAssign;
