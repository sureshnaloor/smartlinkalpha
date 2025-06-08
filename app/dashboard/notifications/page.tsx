"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Bell, Check, MessageSquare, File, AlertCircle, MoreHorizontal, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define notification types
type NotificationType = "message" | "document" | "alert";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  link: string;
}

// Sample notifications data - in a real app, this would come from an API
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from ABC Corp",
    description: "We've reviewed your proposal and would like to schedule a meeting to discuss further.",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    link: "/dashboard/messages",
  },
  {
    id: "2",
    type: "document",
    title: "Document approved",
    description: "Your tax compliance certificate has been approved and is now available in your documents section.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    link: "/dashboard/documents",
  },
  {
    id: "3",
    type: "alert",
    title: "Certification expiring soon",
    description: "Your safety certification will expire in 15 days. Please submit updated documents.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    link: "/dashboard/certifications",
  },
  {
    id: "4",
    type: "message",
    title: "Message from XYZ Inc",
    description: "Thank you for the quick turnaround on the project. We're very satisfied with the results.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: "/dashboard/messages",
  },
  {
    id: "5",
    type: "document",
    title: "New document request",
    description: "Please provide your updated insurance certificate for the upcoming project.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    link: "/dashboard/documents",
  },
  {
    id: "6",
    type: "alert",
    title: "Invoice payment reminder",
    description: "The payment for invoice #INV-2023-456 is due in 3 days.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: true,
    link: "/dashboard/financials",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "document":
        return <File className="h-4 w-4 text-emerald-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter((notification) => {
    // First filter by tab
    if (activeTab === "unread" && notification.read) return false;
    if (activeTab === "messages" && notification.type !== "message") return false;
    if (activeTab === "documents" && notification.type !== "document") return false;
    if (activeTab === "alerts" && notification.type !== "alert") return false;
    
    // Then filter by search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Notifications</h1>
          <Button 
            variant="outline" 
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.read)}
            className="text-xs h-9 border-gray-300 shadow-sm"
          >
            <Check className="mr-2 h-3.5 w-3.5" /> Mark all as read
          </Button>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="pl-9 h-9 text-xs bg-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white/60 border border-gray-200 p-0.5">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
              <TabsTrigger value="messages" className="text-xs">Messages</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md border border-gray-200 ${notification.read ? "opacity-75" : ""}`}
              >
                <CardHeader className="pb-2 px-5 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'message' 
                          ? 'bg-blue-50' 
                          : notification.type === 'document' 
                            ? 'bg-emerald-50' 
                            : 'bg-red-50'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <CardTitle className={`text-base font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs">
                          {format(notification.time, 'MMM d, yyyy \'at\' h:mm a')}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-xs">
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                            Mark as read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <a href={notification.link}>View details</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Delete notification
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="px-5 py-3">
                  <p className="text-xs leading-relaxed text-gray-600">{notification.description}</p>
                </CardContent>
                <CardFooter className="border-t pt-3 pb-3 px-5 flex justify-end">
                  <Button 
                    variant="outline" 
                    asChild 
                    className="text-xs h-8 border-gray-300"
                  >
                    <a href={notification.link}>View details</a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="py-12 text-center bg-white/60 rounded-lg border border-gray-200 shadow-sm">
              <Bell className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-4 text-base font-medium">No notifications found</h3>
              <p className="mt-1 text-xs text-gray-500">
                {searchQuery 
                  ? "Try adjusting your search or filter criteria" 
                  : "You're all caught up!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 