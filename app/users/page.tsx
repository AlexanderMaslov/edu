import React, { Suspense } from "react";
import { UserTable } from "./UserTable";
import Link from "next/link";
interface Props {
  searchParams: { sortOrder?: string };
}

const UsersPage = async ({ searchParams }: Props) => {
  const { sortOrder } = searchParams;

  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p>loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
