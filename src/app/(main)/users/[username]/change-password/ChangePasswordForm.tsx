"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  changeUserPasswordSchema,
  ChangeUserPasswordValues,
} from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "@/components/PasswordInput";
import { useRouter } from "next/navigation";

interface ChangePasswordFormProps {
  username: string;
}

export default function ChangePasswordForm({
  username,
}: ChangePasswordFormProps) {
  const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<ChangeUserPasswordValues>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: ChangeUserPasswordValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await changePassword(values);
      if (error) {
        setError(error);
      } else {
        toast({
          description: "Password changed successfully",
        });
        router.push(`/users/${username}`);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Your old password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Your new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-center text-destructive">{error}</p>}
        <LoadingButton loading={isPending} type="submit">
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}
