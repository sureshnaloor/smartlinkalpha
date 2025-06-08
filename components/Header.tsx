"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogIn, Settings, LogOut, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NotificationDropdown } from "./NotificationDropdown";

// Sample notifications data - in a real app, this would come from an API
const sampleNotifications = [
  {
    id: "1",
    type: "message" as const,
    title: "New message from ABC Corp",
    description: "We've reviewed your proposal and would like to schedule a meeting to discuss further.",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    link: "/dashboard/messages",
  },
  {
    id: "2",
    type: "document" as const,
    title: "Document approved",
    description: "Your tax compliance certificate has been approved and is now available in your documents section.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    link: "/dashboard/documents",
  },
  {
    id: "3",
    type: "alert" as const,
    title: "Certification expiring soon",
    description: "Your safety certification will expire in 15 days. Please submit updated documents.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    link: "/dashboard/certifications",
  },
  {
    id: "4",
    type: "message" as const,
    title: "Message from XYZ Inc",
    description: "Thank you for the quick turnaround on the project. We're very satisfied with the results.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: "/dashboard/messages",
  },
];

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for notifications
  const [notifications, setNotifications] = useState(sampleNotifications);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/vendors", label: "Vendors" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image 
            src="/images/vendorhub-logo.jpg" 
            alt="VendorHub Logo" 
            width={36} 
            height={36} 
            className="rounded-sm"
          />
          <span className="text-primary">VendorHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions Section (right side) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Notifications - Only show if logged in */}
          {session && (
            <NotificationDropdown 
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
              onNotificationClick={handleNotificationClick}
            />
          )}
          
          {/* Authentication / Profile */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                    <AvatarFallback>
                      {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <span className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 border-t bg-background absolute left-0 right-0">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
} 