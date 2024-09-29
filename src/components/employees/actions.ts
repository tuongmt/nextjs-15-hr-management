"use server";

import { lucia, validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getEmployeeDataInclude } from "@/lib/types";
import { signupSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { RoleType } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";

export async function deleteEmployee(id: string) {
  const { user } = await validateRequest();

  if (user?.role !== "ADMIN") throw new Error("Unauthoried");

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employee) throw new Error("Employee not found");

  const deletedEmployee = await prisma.employee.delete({
    where: {
      id,
    },
    include: getEmployeeDataInclude(user.id),
  });

  return deletedEmployee;
}

export async function addEmployee(credentials: SignUpValues) {
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
          mode: "insensitive",
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

    const addedEmployee = await prisma.$transaction(async (tx) => {
      const employee = await tx.employee.create({
        data: {
          id: userId,
        },
      });

      const newUser = await tx.user.create({
        data: {
          id: userId,
          username,
          employee: {
            connect: { id: employee.id },
          },
          displayName: username,
          email,
          passwordHash,
          role: RoleType.USER,
        },
      });

      return newUser;
    });

    return addedEmployee;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
