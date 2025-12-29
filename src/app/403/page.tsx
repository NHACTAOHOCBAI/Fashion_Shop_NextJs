"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ShieldAlert, LogIn } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <ShieldAlert className="w-24 h-24 text-red-500" />
        </div>

        <h1 className="text-9xl font-bold text-red-500">403</h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Access Forbidden</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/client/home">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
