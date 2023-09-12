"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/users");
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Create
    </button>
  );
};

export default NewUserPage;
