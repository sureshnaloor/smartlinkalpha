import type { ReactNode } from "react"
import Link from "next/link"
import { Building2 } from "lucide-react"

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span>VendorHub</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
