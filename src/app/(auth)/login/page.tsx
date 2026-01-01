"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/app/(auth)/login/login-form";
import Loading2 from "@/app/client/_components/Loading2";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("HomePage");
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-[1200px] bg-white rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-[640px]">
        {/* Left Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-[#f4f5ff]">
          <Loading2 />
        </div>

        {/* Right Form */}
        <div className="flex items-center justify-center p-10">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader className="space-y-2">
              <h1>{t("title")}</h1>
              <CardTitle className="text-3xl font-bold ">
                Welcome to <span className=" text-[#40BFFF]">FShop</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social login */}
              <div className="space-y-3">
                <Link href={"http://localhost:4000/api/v1/auth/google"}>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Login form */}
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
