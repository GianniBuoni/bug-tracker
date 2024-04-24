"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IssueRecord } from "@/pocketbase-types";
import { useRouter } from "next/navigation";
import IssueErrorFlag from "./IssueErrorFlag";
import IssueFormErrorMessage from "./IssueFormErrorMessage";

interface Props {
  originalData?: IssueRecord;
}

const IssueForm = ({ originalData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueRecord>();

  const onSubmit = async (data: IssueRecord) => {
    console.log(data);
    try {
      setLoading(true);
      if (originalData)
        await axios.patch("/api/issues/" + originalData.id, data);
      else await axios.post("/api/issues/", data);
      router.push("/issues");
    } catch (error) {
      setLoading(false);
      setError("An unexpected server error occurred.");
    }
  };

  return (
    <form className="card md:w-3/5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      {error && <IssueErrorFlag>{error}</IssueErrorFlag>}
      {originalData && (
        <select
          className="select bg-accent text-base-300"
          defaultValue={originalData?.status}
          {...register("status")}
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS"> In progress</option>
          <option value="CLOSED"> Closed</option>
        </select>
      )}
      <input
        className="input bg-base-300"
        type="text"
        placeholder="Title"
        defaultValue={originalData?.title}
        {...register("title", { required: "A title is required." })}
      />
      {errors.title && (
        <IssueFormErrorMessage>{errors.title.message}</IssueFormErrorMessage>
      )}
      <textarea
        rows={15}
        className="card card-body p-3"
        defaultValue={originalData?.description}
        placeholder="Describe the issue. You can use Markdown!"
        {...register("description", { required: "A description is required." })}
      />
      {errors.description && (
        <IssueFormErrorMessage>
          {errors.description.message}
        </IssueFormErrorMessage>
      )}
      <button type="submit" disabled={loading} className="btn btn-primary">
        {originalData ? "Update" : "Submit"}
        {loading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </button>
    </form>
  );
};

export default IssueForm;

//
//       <textarea
//         defaultValue={originalData?.description}
//         placeholder="Describe the issue. Please use Markdown notation!"
//
//
//         {...register("description")}
//       ></textarea>
//       {
//         <IssueFormErrorMessage>
//           {errors.description?.message}
//         </IssueFormErrorMessage>
//       }
//       <button type="submit" disabled={isLoading} className="btn btn-primary">

//       </button>
//     </form>
//   );
// };

// export default IssueForm;
