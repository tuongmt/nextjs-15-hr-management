import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { EmployeesPage, getEmployeeDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: getEmployeeDataInclude(user.id),
    });

    const nextCursor =
      employees.length > pageSize ? employees[pageSize].id : null;

    const data: EmployeesPage = {
      employees: employees.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {}
}
