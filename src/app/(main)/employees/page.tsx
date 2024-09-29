import { validateRequest } from "@/auth";
import Employees from "@/components/employees/Employees";
import Image from "next/image";

export default async function Page() {
  const { user } = await validateRequest();

  if (user?.role !== "ADMIN") {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm border">
          <h1 className="text-center text-2xl font-bold">Employees</h1>
        </div>
        <Employees />
      </div>
    </main>
  );
}
