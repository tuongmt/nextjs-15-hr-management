"use client";

import kyInstance from "@/lib/ky";
import { EmployeeData, EmployeesPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import Employee from "./Employee";
import { useState } from "react";
import AddEmployeeDialog from "./AddEmployeeDialog";

export default function Employees() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["employees"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/employees",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<EmployeesPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const employees = data?.pages.flatMap((page) => page.employees) || [];

  if (status === "pending") {
    return <Loader2 />;
  }

  if (status === "success" && !employees.length && !hasNextPage) {
    return (
      <p className="to-muted-foreground text-center">
        You don&apos;t have any employees yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading employees.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <button
        onClick={() => setShowAddDialog(true)}
        className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
      <article className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Display Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Hire Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          {employees.map((employee) => (
            <Employee
              key={employee.id}
              employee={employee}
              userRole={employee.user?.role}
            />
          ))}
        </table>
        <AddEmployeeDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
        />
      </article>

      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
