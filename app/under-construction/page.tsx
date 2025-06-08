"use client";

import Link from "next/link";
import { Home, LayoutDashboard, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function UnderConstruction() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-200 dark:bg-amber-900/30 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-3xl opacity-30 animate-pulse-subtle" style={{ animationDelay: "1.5s" }}></div>
      
      <div className={`mb-12 transform transition-all duration-700 ${mounted ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-lg opacity-20 animate-pulse-subtle"></div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-8 rounded-full relative">
            <Construction className="h-24 w-24 text-white" />
          </div>
        </div>
      </div>

      <h1 className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 transform transition-all duration-500 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        Under Construction
      </h1>
      
      <p className={`text-gray-600 dark:text-gray-300 max-w-md mb-10 transform transition-all duration-500 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        We're currently building this page with exciting new features. Please check back soon to see what we're working on.
      </p>

      <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-500 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <Button 
          variant="default" 
          asChild
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-amber-500/20 hover:scale-105 transition-all duration-200"
        >
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>
        <Button 
          variant="outline" 
          asChild
          className="border-amber-400 text-amber-600 dark:border-amber-500 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:scale-105 transition-all duration-200"
        >
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
} 