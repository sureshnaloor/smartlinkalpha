"use client";

import Link from "next/link";
import { ArrowLeft, Home, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export default function UnderConstruction({
  title = "Page Under Construction",
  message = "We're working on this page. It will be available soon."
}: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Image 
        src="/images/construction.svg" 
        alt="Under Construction" 
        width={250} 
        height={250}
        className="mb-8"
      />
      
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        
        <Link href="/">
          <Button className="flex items-center gap-2 bg-primary">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 