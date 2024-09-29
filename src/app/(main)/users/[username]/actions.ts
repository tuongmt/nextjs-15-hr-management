"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {  getUserDataSelect } from "@/lib/types";
import {
  changeUserPasswordSchema,
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validateValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthoried");

  const result = await prisma.$transaction(async (tx) => {
    const updatedUser = tx.user.update({
      where: { id: user.id },
      data: validateValues,
      select: getUserDataSelect(user.id),
    });

    return updatedUser;
  });

  return result;
}
