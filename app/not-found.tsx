"use client";

import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-40 animate-pulse-subtle"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-30 animate-pulse-subtle" style={{ animationDelay: "1.5s" }}></div>
      
      <div className={`mb-12 transform transition-all duration-700 ${mounted ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-full blur-lg opacity-20 animate-pulse-subtle"></div>
          <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-8 rounded-full relative">
            <FileQuestion className="h-24 w-24 text-white" />
          </div>
        </div>
      </div>

      <h1 className={`text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 transform transition-all duration-500 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        404
      </h1>
      
      <h2 className={`text-2xl font-semibold mb-4 transform transition-all duration-500 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        Page Not Found
      </h2>
      
      <p className={`text-gray-600 dark:text-gray-300 max-w-md mb-10 transform transition-all duration-500 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>

      <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-500 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <Button 
          variant="default" 
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
        <Button 
          variant="outline" 
          asChild
          className="border-indigo-400 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:scale-105 transition-all duration-200"
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