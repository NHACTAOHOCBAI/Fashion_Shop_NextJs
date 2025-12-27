"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <Card className="w-[400px] max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Registration Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your account has been created successfully.
            <br />
            Please check your email and click the verification link to activate
            your account.
          </p>

          <Button
            className="w-full bg-[#40BFFF] hover:bg-[#40BFFF]/70"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
