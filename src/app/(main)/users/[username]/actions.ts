"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getEmployeeDataSelect } from "@/lib/types";
import {
  changeUserPasswordSchema,
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validateValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthoried");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = tx.employee.update({
      where: { id: user.id },
      data: validateValues,
      select: getEmployeeDataSelect(user.id),
    });
    return updatedUser;
  });

  return updatedUser;
}
