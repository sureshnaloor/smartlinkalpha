import { useState, useEffect } from 'react'

export function useDemoState() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDemoState = async () => {
      try {
        const response = await fetch('/api/demo')
        if (response.ok) {
          const data = await response.json()
          setIsVisible(data.visible)
        }
      } catch (error) {
        console.error('Error loading demo state:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDemoState()

    // Listen for demo state changes from other components
    const handleDemoStateChange = (event: CustomEvent) => {
      setIsVisible(event.detail.visible)
    }

    window.addEventListener('demoStateChanged', handleDemoStateChange as EventListener)

    return () => {
      window.removeEventListener('demoStateChanged', handleDemoStateChange as EventListener)
    }
  }, [])

  return { isVisible, isLoading }
}
