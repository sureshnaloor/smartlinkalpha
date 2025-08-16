"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useDemoState } from "@/hooks/use-demo-state"

interface DemoDataProps {
  children: React.ReactNode
  title?: string
}

export function DemoToggle({ children, title = "Demo Data" }: DemoDataProps) {
  const { isVisible, isLoading } = useDemoState()
  const [isToggling, setIsToggling] = useState(false)
  const { toast } = useToast()



  const handleToggle = async () => {
    setIsToggling(true)
    
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Demo Data",
          description: data.message,
          variant: "default",
        })
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('demoStateChanged', { detail: { visible: data.visible } }))
      } else {
        throw new Error(data.error || 'Failed to toggle demo data')
      }
    } catch (error) {
      console.error('Error toggling demo state:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to toggle demo data",
        variant: "destructive",
      })
    } finally {
      setIsToggling(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  // If demo data is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  return (
    <div className="border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              {title}
            </h3>
          </div>
          <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/30 px-2 py-1 rounded">
            Demo
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          disabled={isToggling}
          className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-800/30"
        >
          {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
          <span className="ml-2">Hide Demo</span>
        </Button>
      </div>
      <div className="text-sm text-amber-700 dark:text-amber-300 mb-4">
        This is sample data for demonstration purposes. Your actual data will appear here once you start using the application.
      </div>
      {children}
    </div>
  )
}
