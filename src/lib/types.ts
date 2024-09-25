import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    employee: true,
    createdAt: true,
    email: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getEmployeeDataSelect(loggedInUserId: string) {
  return {
    id: true,
    displayName: true,
    phone: true,
    avatarUrl: true,
  } satisfies Prisma.EmployeeSelect;
}

export type EmployeeData = Prisma.EmployeeGetPayload<{
  select: ReturnType<typeof getEmployeeDataSelect>;
}>;
