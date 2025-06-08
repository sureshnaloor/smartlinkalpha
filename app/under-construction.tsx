"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnderConstruction() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M17 12h.01" />
          <path d="M7 12h.01" />
          <path d="M2 10h20" />
          <path d="M2 14h20" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-4">Under Construction</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We're currently building this page. Please check back soon to see the new features we're working on.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="default" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 