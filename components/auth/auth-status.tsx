"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface AuthStatusProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export function AuthStatus({ user }: AuthStatusProps) {
  const { toast } = useToast()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    toast({
      title: "Signed out successfully",
      description: "You've been logged out of your account.",
    })
  }
  
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
              {user.image ? (
                <img 
                  src={user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-700" />
                </div>
              )}
              {user.name ? (
                <span className="hidden md:inline-block">{user.name}</span>
              ) : (
                <span className="hidden md:inline-block">{user.email}</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button variant={isHomePage ? "ghost" : "default"}>Log in</Button>
          </Link>
          <Link href="/signup">
            <Button variant={isHomePage ? "default" : "default"}>Sign up</Button>
          </Link>
        </div>
      )}
    </>
  )
} 