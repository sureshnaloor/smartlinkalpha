"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useDemoState } from "@/hooks/use-demo-state"

export function DashboardHeader() {
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
    return null
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Demo Data Status:
        </span>
        <span className={`text-xs px-2 py-1 rounded ${
          isVisible 
            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {isVisible ? 'Visible' : 'Hidden'}
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={isToggling}
        className={`${
          isVisible 
            ? 'text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-800/30'
            : 'text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800/30'
        }`}
      >
        {isToggling ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="ml-2">
          {isVisible ? 'Hide Demo Data' : 'Show Demo Data'}
        </span>
      </Button>
    </div>
  )
}
