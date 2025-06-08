"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-6 md:py-8">
        {/* Copyright section */}
        <div className="text-center sm:text-left order-2 sm:order-1 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 mb-2">
            <Image 
              src="/images/vendorhub-logo.jpg" 
              alt="VendorHub Logo" 
              width={24} 
              height={24} 
              className="rounded-sm"
            />
            <span className="font-semibold text-foreground">VendorHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} VendorHub. All rights reserved.
          </p>
        </div>
        
        {/* Links section */}
        <nav className="flex gap-4 sm:gap-6 order-1 sm:order-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
} 