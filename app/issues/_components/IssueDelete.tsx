"use client";
import Spinner from "@/app/_components/Spinner";
import { pb } from "@/app/_services/pb";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const IssueDelete = ({ id }: { id: string }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/issues/" + id);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError("An unexpected server error occurred. Error was not Deleted");
    }
  };

  return (
    <>
      <button
        className="btn btn-block btn-error"
        onClick={() => document.getElementById("delete_modal")!.showModal()}
        disabled={isLoading}
      >
        Delete Issue
        {isLoading && <Spinner />}
      </button>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this issue?
          </h3>
          <p className="py-4">This action cannot be undone.</p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-neutral">Cancel</button>
              <button className="btn btn-error" onClick={deleteIssue}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default IssueDelete;
