"use client";

import DashboardCard from "@/components/DashboardCard";
import kyInstance from "@/lib/ky";
import { EmployeesPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardCards({}) {
  const router = useRouter();

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
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* Card 1 */}
      <DashboardCard
        title={"Number of Employees"}
        desc={employees.length.toString()}
        className={"bg-blue-500 hover:bg-blue-600"}
        onClick={() => router.push("./employees")}
        buttonName="Details"
      />

      {/* Card 2 */}
      <DashboardCard
        title={"Number of Employees"}
        desc={employees.length.toString()}
        className={"bg-green-500 hover:bg-green-600"}
        onClick={() => console.log("hihi")}
        buttonName="Details"
      />

      {/* Card 3 */}
      <DashboardCard
        title={"Number of Employees"}
        desc={employees.length.toString()}
        className={"bg-red-500 hover:bg-red-600"}
        onClick={() => console.log("hihi")}
        buttonName="Details"
      />
    </article>
  );
}
