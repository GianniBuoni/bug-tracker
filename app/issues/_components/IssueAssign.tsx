import { pb } from "@/app/_services/pb";
import { UsersRecord } from "@/pocketbase-types";

const IssueAssign = async () => {
  const users: UsersRecord[] = await pb.collection("users").getFullList({
    fields: "username,email,name,id",
    sort: "name",
  });

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
