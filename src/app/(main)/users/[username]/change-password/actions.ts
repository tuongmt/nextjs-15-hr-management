"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  changeUserPasswordSchema,
  ChangeUserPasswordValues,
} from "@/lib/validation";
import { hash, verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function changePassword(
  input: ChangeUserPasswordValues,
): Promise<{ error: string }> {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) throw new Error("Unauthoried");

    const { oldPassword, newPassword } = changeUserPasswordSchema.parse(input);

    if (oldPassword === newPassword) {
      return {
        error: "Two passwords cannot be the same",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: loggedInUser.id },
    });

    if (!user) throw new Error("Unauthoried");

    const isOldPasswordValid = await verify(user.passwordHash!, oldPassword);

    if (!isOldPasswordValid) {
      return {
        error: "Incorrect old password",
      };
    }

    const passwordHash = await hash(newPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return {
      error: "",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
