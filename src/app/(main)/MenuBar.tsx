import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { read } from "fs";
import {
  Bell,
  Bookmark,
  DollarSign,
  Home,
  Mail,
  MessageSquareQuote,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Employees"
        asChild
      >
        <Link href="/employees">
          <Users />
          <span className="hidden lg:inline">Employees</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="LeaveRequests"
        asChild
      >
        <Link href="/leave-requests">
          <MessageSquareQuote />
          <span className="hidden lg:inline">Leave Requests</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Payrolls"
        asChild
      >
        <Link href="/payrolls">
          <DollarSign />
          <span className="hidden lg:inline">Payrolls</span>
        </Link>
      </Button>
    </div>
  );
}
