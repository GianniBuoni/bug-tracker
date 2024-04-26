"use client";

import { pb } from "@/app/_services/pb";
import { useForm } from "react-hook-form";
import { UsersRecord } from "@/pocketbase-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "@/app/_components/Spinner";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersRecord>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const login = async (data: UsersRecord) => {
    try {
      setLoading(true);
      const user = await axios.post("/api/auth", {
        identity: "jon@jon.com",
        password: "password",
      });
    } catch (error) {
      setLoading(false);
      alert("Credentials don't match any record.");
    }
  };

  return (
    <>
      <p className="mb-3">Logged In : {pb.authStore.isValid.toString()}</p>
      <form
        className="join join-vertical md:join-horizontal outline"
        onSubmit={handleSubmit(login)}
      >
        <input
          type="text"
          placeholder="email"
          className="input input-bordered join-item"
          {...register("identity")}
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered join-item"
          {...register("password")}
        />
        <button className="btn btn-primary join-item" disabled={loading}>
          Sign In{loading && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default Auth;
