import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";
import { Locate, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[45rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="relative w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to T-HRM</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted"></div>
              <span>OR</span>
              <div className="h-px flex-1 bg-muted"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted"></div>
              <span>CONTACT INFO</span>
              <div className="h-px flex-1 bg-muted"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 hover:underline">
                <MapPin className="size-5" />
                <p>District 11, Ho Chi Minh City</p>
              </div>
              <div className="flex items-center gap-4 hover:underline">
                <Mail className="size-5" />
                <Link href="mailto:tuantuong326@gmail.com">
                  tuantuong326@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-4 hover:underline">
                <Phone className="size-5" />
                <Link href="tel:0386040650">0386040650</Link>
              </div>
            </div>

            <div className="absolute bottom-5 left-0 right-0 mx-auto w-max text-center">
              <p className="text-muted-foreground">
                &copy; 2024, Ma Tuan Tuong
              </p>
            </div>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
