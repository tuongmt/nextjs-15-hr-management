import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    employee: true,
    createdAt: true,
    email: true,
    displayName: true,
    avatarUrl: true,
    phone: true,
    role: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getEmployeeDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    leaveRequests: true,
    payrolls: true,
  } satisfies Prisma.EmployeeInclude;
}

export type EmployeeData = Prisma.EmployeeGetPayload<{
  include: ReturnType<typeof getEmployeeDataInclude>;
}>;

export interface EmployeesPage {
  employees: EmployeeData[];
  nextCursor: string | null;
}
