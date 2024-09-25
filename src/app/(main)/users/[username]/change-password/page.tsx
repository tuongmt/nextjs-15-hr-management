import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

interface PageProps {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `Change password (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;ve not authoried to view this page.
      </p>
    );
  }

  if (loggedInUser.username !== username) {
    return (
      <p className="text-destructive">
        You&apos;ve not authoried to do action in this page.
      </p>
    );
  }

  return (
    <main className="w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">Change password</h2>
          <ChangePasswordForm username={loggedInUser.username} />
        </div>
      </div>
    </main>
  );
}
