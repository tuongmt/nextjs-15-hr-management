"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { RoleType } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  try {
    const { email, username, password } = signupSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive", // "flodrian" == "Flodrian"
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    await prisma.$transaction(async (tx) => {
      const employee = await tx.employee.create({
        data: {
          id: userId,
          displayName: username,
        },
      });

      await tx.user.create({
        data: {
          id: userId,
          username,
          employee: {
            connect: { id: employee.id },
          },
          email,
          passwordHash,
          role: RoleType.USER,
        },
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
