import { validateRequest } from "@/auth";
import Image from "next/image";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;ve not authoried to view this page.
      </p>
    );
  }

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm border">
          <h1 className="text-center text-2xl font-bold">Leave Requests</h1>
        </div>
       
      </div>
    </main>
  );
}
