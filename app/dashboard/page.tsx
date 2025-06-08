import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  BarChart4,
  FileCheck,
  Bell
} from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | VendorHub",
  description: "Manage your vendor account",
}

export default async function DashboardPage() {
  const session = await getSession()
  
  // Double-check authentication here, although middleware should handle this
  if (!session) {
    redirect("/signin")
  }
  
  return (
    <div className="py-8 bg-stone-50 dark:bg-gray-900/40 min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-blue-800 dark:text-blue-300">Welcome, {session.user.name || session.user.email}</h1>
            <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your vendor account</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50">
              <CheckCircle2 className="h-4 w-4" />
              <span>Account in good standing</span>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow p-4 flex items-center">
            <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-3 mr-4">
              <BarChart4 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Completion</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">33%</p>
                <span className="text-xs text-red-600 dark:text-red-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  Needs attention
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow p-4 flex items-center">
            <div className="rounded-full bg-amber-50 dark:bg-amber-900/20 p-3 mr-4">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Renewals</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</p>
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-0.5" />
                  No action needed
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow p-4 flex items-center">
            <div className="rounded-full bg-purple-50 dark:bg-purple-900/20 p-3 mr-4">
              <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2</p>
                <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-0.5" />
                  Unread
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Getting Started</h2>
              <div className="ml-auto text-indigo-600 dark:text-indigo-400">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Complete your profile to get the most out of VendorHub.
            </p>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-1/3" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Profile completion: <span className="font-medium text-emerald-600 dark:text-emerald-400">33%</span></p>
          </div>
          
          <div className="p-5 bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Upcoming Renewals</h2>
              <div className="ml-auto text-purple-600 dark:text-purple-400">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              No upcoming document renewals in the next 30 days.
            </p>
          </div>
          
          <div className="p-5 bg-white dark:bg-gray-800/90 rounded-lg border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-semibold text-amber-700 dark:text-amber-300">Recent Activity</h2>
              <div className="ml-auto text-amber-600 dark:text-amber-400">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                <p className="text-gray-700 dark:text-gray-200 font-medium">Account created</p>
                <p className="text-gray-500 dark:text-gray-400">Today</p>
              </div>
              <div className="text-xs p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                <p className="text-gray-700 dark:text-gray-200 font-medium">First login</p>
                <p className="text-gray-500 dark:text-gray-400">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
