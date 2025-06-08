"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, MoreVertical, Send, Check, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: number
  content: string
  sender: "vendor" | "buyer"
  timestamp: string
  read: boolean
}

type Conversation = {
  id: number
  company: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: Message[]
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      company: "Global Construction Corp",
      avatar: "GC",
      lastMessage: "We need additional information about your safety certifications for the upcoming project.",
      timestamp: "2 hours ago",
      unread: 2,
      messages: [
        {
          id: 1,
          content: "Hello, we're considering your company for our upcoming project in Dubai.",
          sender: "buyer",
          timestamp: "2023-04-10T10:30:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for considering us. We'd be happy to provide any information you need.",
          sender: "vendor",
          timestamp: "2023-04-10T11:15:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Great! We need additional information about your safety certifications for the upcoming project. Can you share your latest safety records and certifications?",
          sender: "buyer",
          timestamp: "2023-04-11T09:45:00",
          read: false,
        },
        {
          id: 4,
          content: "Also, do you have experience working in similar environments?",
          sender: "buyer",
          timestamp: "2023-04-11T09:47:00",
          read: false,
        },
      ],
    },
    {
      id: 2,
      company: "Tech Solutions Inc",
      avatar: "TS",
      lastMessage: "Thank you for submitting your proposal. We have a few follow-up questions.",
      timestamp: "Yesterday",
      unread: 1,
      messages: [
        {
          id: 1,
          content: "We've received your proposal for the IT infrastructure upgrade.",
          sender: "buyer",
          timestamp: "2023-04-09T14:20:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for confirming. Is there anything specific you'd like to discuss?",
          sender: "vendor",
          timestamp: "2023-04-09T15:05:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Thank you for submitting your proposal. We have a few follow-up questions about your implementation timeline and resource allocation.",
          sender: "buyer",
          timestamp: "2023-04-10T11:30:00",
          read: false,
        },
      ],
    },
    {
      id: 3,
      company: "Manufacturing Partners",
      avatar: "MP",
      lastMessage: "Your annual compliance documents have been reviewed and approved.",
      timestamp: "3 days ago",
      unread: 0,
      messages: [
        {
          id: 1,
          content: "We've completed the review of your annual compliance documents.",
          sender: "buyer",
          timestamp: "2023-04-08T09:15:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for the update. Is there anything else you need from us?",
          sender: "vendor",
          timestamp: "2023-04-08T10:20:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Your annual compliance documents have been reviewed and approved. You're all set for the coming year.",
          sender: "buyer",
          timestamp: "2023-04-08T11:45:00",
          read: true,
        },
        {
          id: 4,
          content: "That's great news! Thank you for the confirmation.",
          sender: "vendor",
          timestamp: "2023-04-08T13:10:00",
          read: true,
        },
      ],
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all messages as read when selecting a conversation
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map((msg) => ({ ...msg, read: true })),
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation(conversation)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        const newMsg: Message = {
          id: Math.max(...conv.messages.map((m) => m.id)) + 1,
          content: newMessage,
          sender: "vendor",
          timestamp: new Date().toISOString(),
          read: true,
        }

        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: "Just now",
          messages: [...conv.messages, newMsg],
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation(updatedConversations.find((c) => c.id === selectedConversation.id) || null)
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row bg-zinc-50">
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-white shadow-md z-10">
        <div className="p-4 border-b border-gray-200 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-base">Messages</h2>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-sm text-xs h-8 px-3" asChild>
              <Link href="/dashboard/messages/new">
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                New
              </Link>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 h-9 text-xs bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversation?.id === conversation.id 
                  ? "bg-emerald-50 border-l-2 border-l-emerald-500" 
                  : "hover:bg-gray-50 border-l-2 border-l-transparent"
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 mt-1">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${conversation.avatar}`} />
                  <AvatarFallback className="text-xs">{conversation.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm truncate">{conversation.company}</div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                      {conversation.unread === 0 ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Clock className="h-3 w-3 text-amber-500" />
                      )}
                      {conversation.timestamp}
                    </div>
                  </div>
                  <div className={`text-xs truncate ${conversation.unread > 0 ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                    {conversation.lastMessage}
                  </div>
                  {conversation.unread > 0 && (
                    <div className="mt-1">
                      <Badge className="bg-emerald-600 text-[10px] h-4 px-1.5 min-w-[1.25rem] flex items-center justify-center">
                        {conversation.unread}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-50/70">
        {selectedConversation ? (
          <>
            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${selectedConversation.avatar}`} />
                  <AvatarFallback className="text-xs">{selectedConversation.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{selectedConversation.company}</div>
                  <div className="text-[10px] text-gray-500">Active now</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-xs">
                  <DropdownMenuItem>View Company Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                  <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 px-5 py-4 overflow-auto">
              <div className="space-y-4 max-w-3xl mx-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                        message.sender === "vendor" 
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                          : "bg-white text-gray-800 border border-gray-100"
                      }`}
                    >
                      <div className="text-xs leading-normal">{message.content}</div>
                      <div
                        className={`text-[10px] mt-1 flex items-center gap-1 ${
                          message.sender === "vendor" ? "text-emerald-100" : "text-gray-400"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {message.sender === "vendor" && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2 max-w-3xl mx-auto">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px] text-sm resize-none bg-gray-50 border-gray-200 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 self-end shadow-sm h-9 w-9 p-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center bg-white rounded-lg shadow-sm p-8">
              <h3 className="font-medium text-base">No conversation selected</h3>
              <p className="text-gray-500 text-xs mt-2">Select a conversation from the list or start a new one</p>
              <Button
                className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm text-xs h-9"
                asChild
              >
                <Link href="/dashboard/messages/new">
                  <PlusCircle className="h-3.5 w-3.5 mr-2" />
                  New Conversation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
