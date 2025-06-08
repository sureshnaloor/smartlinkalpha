"use client";

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Upload,
  Settings,
  LogOut,
  Menu,
  Bell,
  FileImage,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-1">
      {/* Mobile Sidebar Toggle */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] border-r border-gray-200 dark:border-gray-800 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-800 font-semibold text-xl bg-white dark:bg-gray-950">
              <Image 
                src="/images/vendorhub-logo.jpg" 
                alt="VendorHub Logo" 
                width={28} 
                height={28}
                className="rounded-sm" 
              />
              <span className="text-gray-900 dark:text-gray-100">VendorHub</span>
            </div>
            <nav className="flex-1 space-y-1 py-4 bg-gray-50 dark:bg-gray-900 h-full">
              <MobileNavLinks />
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 bg-white dark:bg-gray-950">
          <Image 
            src="/images/vendorhub-logo.jpg" 
            alt="VendorHub Logo" 
            width={24} 
            height={24}
            className="rounded-sm" 
          />
          <span className="font-semibold text-gray-900 dark:text-gray-100">VendorHub</span>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <DesktopNavLinks />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

function DesktopNavLinks() {
  const pathname = usePathname()
  
  return (
    <>
      <NavLink href="/dashboard" active={pathname === "/dashboard"}>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </NavLink>
      <NavLink href="/dashboard/profile" active={pathname === "/dashboard/profile"}>
        <FileText className="mr-2 h-4 w-4" />
        Company Profile
      </NavLink>
      <NavLink href="/dashboard/certifications" active={pathname === "/dashboard/certifications"}>
        <FileText className="mr-2 h-4 w-4" />
        Certifications
      </NavLink>
      <NavLink href="/dashboard/experience" active={pathname === "/dashboard/experience"}>
        <Users className="mr-2 h-4 w-4" />
        Past Experience
      </NavLink>
      <NavLink href="/dashboard/financials" active={pathname === "/dashboard/financials"}>
        <FileText className="mr-2 h-4 w-4" />
        Financial Information
      </NavLink>
      <NavLink href="/dashboard/personnel" active={pathname === "/dashboard/personnel"}>
        <Users className="mr-2 h-4 w-4" />
        Key Personnel
      </NavLink>
      <NavLink href="/dashboard/documents" active={pathname === "/dashboard/documents"}>
        <Upload className="mr-2 h-4 w-4" />
        Documents
      </NavLink>
      <NavLink href="/dashboard/multimedia" active={pathname === "/dashboard/multimedia"}>
        <FileImage className="mr-2 h-4 w-4" />
        Multimedia Documents
      </NavLink>
      <NavLink href="/dashboard/messages" active={pathname === "/dashboard/messages"}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Messages
      </NavLink>
      <NavLink href="/dashboard/notifications" active={pathname === "/dashboard/notifications"}>
        <Bell className="mr-2 h-4 w-4" />
        Notifications
      </NavLink>
      <NavLink href="/dashboard/settings" active={pathname === "/dashboard/settings"}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </NavLink>
    </>
  )
}

function MobileNavLinks() {
  const pathname = usePathname()
  
  return (
    <>
      <NavLink href="/dashboard" active={pathname === "/dashboard"} mobile>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </NavLink>
      <NavLink href="/dashboard/profile" active={pathname === "/dashboard/profile"} mobile>
        <FileText className="mr-2 h-4 w-4" />
        Company Profile
      </NavLink>
      <NavLink href="/dashboard/certifications" active={pathname === "/dashboard/certifications"} mobile>
        <FileText className="mr-2 h-4 w-4" />
        Certifications
      </NavLink>
      <NavLink href="/dashboard/experience" active={pathname === "/dashboard/experience"} mobile>
        <Users className="mr-2 h-4 w-4" />
        Past Experience
      </NavLink>
      <NavLink href="/dashboard/financials" active={pathname === "/dashboard/financials"} mobile>
        <FileText className="mr-2 h-4 w-4" />
        Financial Information
      </NavLink>
      <NavLink href="/dashboard/personnel" active={pathname === "/dashboard/personnel"} mobile>
        <Users className="mr-2 h-4 w-4" />
        Key Personnel
      </NavLink>
      <NavLink href="/dashboard/documents" active={pathname === "/dashboard/documents"} mobile>
        <Upload className="mr-2 h-4 w-4" />
        Documents
      </NavLink>
      <NavLink href="/dashboard/multimedia" active={pathname === "/dashboard/multimedia"} mobile>
        <FileImage className="mr-2 h-4 w-4" />
        Multimedia Documents
      </NavLink>
      <NavLink href="/dashboard/messages" active={pathname === "/dashboard/messages"} mobile>
        <MessageSquare className="mr-2 h-4 w-4" />
        Messages
      </NavLink>
      <NavLink href="/dashboard/notifications" active={pathname === "/dashboard/notifications"} mobile>
        <Bell className="mr-2 h-4 w-4" />
        Notifications
      </NavLink>
      <NavLink href="/dashboard/settings" active={pathname === "/dashboard/settings"} mobile>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </NavLink>
    </>
  )
}

function NavLink({ href, active, mobile, children }: { 
  href: string; 
  active?: boolean;
  mobile?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button 
      variant={active ? "default" : "ghost"} 
      className={`${mobile ? "w-full" : ""} justify-start ${
        active 
          ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-200" 
          : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      }`}
      asChild
    >
      <Link href={href}>
        {children}
        {active && (
          <div className="ml-auto w-1 h-6 bg-blue-500 dark:bg-blue-400 rounded-full" />
        )}
      </Link>
    </Button>
  )
}
