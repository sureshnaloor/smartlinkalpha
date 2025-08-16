# Demo Toggle System Guide

## Overview

The demo toggle system allows users to show/hide demo data across all dashboard pages. This is useful for demonstrating the application's functionality while allowing users to work with their own data.

## How It Works

### 1. Database Structure

The system uses a MongoDB collection called `demo` with a single document containing:
```json
{
  "visible": true/false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. API Endpoints

- **GET** `/api/demo` - Get current demo state
- **PUT** `/api/demo` - Set demo state (requires `{ visible: boolean }`)
- **POST** `/api/demo` - Toggle demo state

### 3. Components

#### DashboardHeader
Located in the dashboard layout, shows the current demo state and provides a toggle button.

#### DemoToggle
A wrapper component that conditionally renders demo content based on the demo state.

#### useDemoState Hook
A custom hook that provides the current demo state and loading status.

## Usage Examples

### 1. Wrapping Demo Content

```tsx
import { DemoToggle } from "@/components/DemoToggle"

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Demo content wrapped in DemoToggle */}
      <DemoToggle title="Sample Data">
        <div className="grid gap-4">
          {/* Your demo content here */}
          <Card>Sample Card 1</Card>
          <Card>Sample Card 2</Card>
        </div>
      </DemoToggle>
      
      {/* Real content (always visible) */}
      <div className="mt-8">
        <h2>Your Real Data</h2>
        {/* Real data content */}
      </div>
    </div>
  )
}
```

### 2. Using the Hook Directly

```tsx
import { useDemoState } from "@/hooks/use-demo-state"

export default function MyComponent() {
  const { isVisible, isLoading } = useDemoState()
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!isVisible) {
    return <div>No demo data to show</div>
  }
  
  return (
    <div>
      {/* Demo content */}
    </div>
  )
}
```

### 3. Listening for Demo State Changes

```tsx
import { useEffect } from 'react'

export default function MyComponent() {
  useEffect(() => {
    const handleDemoStateChange = (event: CustomEvent) => {
      console.log('Demo state changed to:', event.detail.visible)
      // Handle the change
    }

    window.addEventListener('demoStateChanged', handleDemoStateChange as EventListener)

    return () => {
      window.removeEventListener('demoStateChanged', handleDemoStateChange as EventListener)
    }
  }, [])
  
  return <div>My Component</div>
}
```

## Implementation Steps

### 1. For New Pages

1. Import the DemoToggle component:
   ```tsx
   import { DemoToggle } from "@/components/DemoToggle"
   ```

2. Wrap your demo content:
   ```tsx
   <DemoToggle title="Your Demo Title">
     {/* Your demo content */}
   </DemoToggle>
   ```

### 2. For Existing Pages

1. Identify demo content in your page
2. Wrap it with the DemoToggle component
3. Add a descriptive title
4. Test the toggle functionality

## Best Practices

1. **Clear Titles**: Use descriptive titles for demo sections
2. **Separate Demo from Real**: Keep demo content separate from real user data
3. **Consistent Styling**: Demo content should be clearly marked
4. **Performance**: Demo content should not impact page performance when hidden

## Current Implementation

The following pages have been updated with demo toggle functionality:

- ✅ `/dashboard` - Dashboard overview and cards
- ✅ `/dashboard/certifications` - Sample certifications
- ✅ `/dashboard/experience` - Sample projects and materials
- ✅ `/dashboard/financials` - Sample financial documents
- ✅ `/dashboard/personnel` - Sample team members
- ✅ `/dashboard/documents` - Sample company documents
- ✅ `/dashboard/multimedia` - Sample multimedia content
- ✅ `/dashboard/messages` - Sample conversations
- ✅ `/dashboard/notifications` - Sample notifications
- 🔄 `/dashboard/settings` - Under construction (redirect only)

## Testing

1. Navigate to any dashboard page
2. Look for the demo toggle button in the header
3. Click to hide/show demo data
4. Verify that the state persists across page refreshes
5. Check that the toggle works across all pages
