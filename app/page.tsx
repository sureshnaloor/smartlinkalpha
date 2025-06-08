"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, FileText, MessageSquare, BarChart3 } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Fetch session data
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        setSession(data.session || null)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch session:", error)
        setIsLoading(false)
      }
    }
    
    fetchSession()
  }, [])
  
  return (
    <>
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-200 dark:bg-purple-900 rounded-full blur-2xl opacity-40 animate-pulse-subtle"></div>
              <div className="absolute top-1/2 -right-10 w-24 h-24 bg-blue-200 dark:bg-blue-900 rounded-full blur-2xl opacity-30 animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
              
              <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-purple-400">
                Streamline Your Vendor Management Process
              </h1>
              <p className="text-gray-700 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                A comprehensive platform for vendor registration, prequalification, and ongoing management. Connect
                with qualified vendors and simplify your procurement process.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={!isLoading && session ? "/dashboard" : "/signup"}>
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-purple-500 shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-200">
                    {!isLoading && session ? "Go to Dashboard" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-indigo-400 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:scale-105 transition-all duration-200">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 rounded-xl overflow-hidden border-0 shadow-2xl shadow-indigo-200 dark:shadow-indigo-950 relative group">
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-200 dark:bg-emerald-900 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <img
                src="/images/vendormanagement.jpg?height=400&width=600"
                alt="Vendor Management Dashboard"
                className="aspect-video object-cover w-full scale-100 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30 animate-pulse-subtle" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-30 animate-pulse-subtle" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Comprehensive Vendor Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 md:text-lg max-w-2xl mx-auto">
              Everything you need to manage your vendor relationships in one place
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Streamlined Onboarding",
                description: "Simple registration process with social login options and guided profile completion.",
                icon: <Users className="h-10 w-10 text-white" />,
                color: "from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500"
              },
              {
                title: "Comprehensive Profiles",
                description:
                  "Capture detailed vendor information including certifications, experience, and capabilities.",
                icon: <FileText className="h-10 w-10 text-white" />,
                color: "from-purple-600 to-violet-600 dark:from-purple-500 dark:to-violet-500"
              },
              {
                title: "Document Management",
                description: "Secure storage for certificates, compliance documents, brochures, and catalogs.",
                icon: <FileText className="h-10 w-10 text-white" />,
                color: "from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500"
              },
              {
                title: "Integrated Communication",
                description: "Built-in messaging system for direct communication between vendors and buyers.",
                icon: <MessageSquare className="h-10 w-10 text-white" />,
                color: "from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500"
              },
              {
                title: "Annual Compliance",
                description: "Automated reminders and tracking for annual document submissions.",
                icon: <CheckCircle className="h-10 w-10 text-white" />,
                color: "from-rose-600 to-pink-600 dark:from-rose-500 dark:to-pink-500"
              },
              {
                title: "Advanced Reporting",
                description: "Comprehensive analytics on vendor onboarding, categories, and compliance status.",
                icon: <BarChart3 className="h-10 w-10 text-white" />,
                color: "from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500"
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-5 p-4 rounded-full bg-gradient-to-r ${feature.color} w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 flex-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
