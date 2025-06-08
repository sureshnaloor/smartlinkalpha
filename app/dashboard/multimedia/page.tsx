"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  FileText,
  Download,
  Trash2,
  Edit,
  Calendar,
  Search,
  Filter,
  FileImage,
  Video,
  BookOpen,
  MessageSquare,
  MoreVertical,
  Play,
  ExternalLink,
  Upload
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type MediaType = "profile" | "catalog" | "video" | "testimonial"

type MediaItem = {
  id: number
  name: string
  type: MediaType
  description: string
  uploadDate: string
  fileType?: string
  fileSize: string
  thumbnailUrl?: string
  url: string
  color: string
  author?: string
  authorRole?: string
  authorCompany?: string
  duration?: string
}

export default function MultimediaPage() {
  const { toast } = useToast()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      name: "Company Profile 2023",
      type: "profile",
      description: "Comprehensive overview of our company history, mission, values, and services.",
      uploadDate: "2023-01-15",
      fileType: "PDF",
      fileSize: "15.3 MB",
      url: "#",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Product Catalog - Q1 2023",
      type: "catalog",
      description: "Complete catalog of all our products with specifications and pricing information.",
      uploadDate: "2023-03-10",
      fileType: "PDF",
      fileSize: "22.7 MB",
      url: "#",
      color: "from-emerald-500 to-green-600",
    },
    {
      id: 3,
      name: "Corporate Introduction Video",
      type: "video",
      description: "A brief introduction to our company facilities and production processes.",
      uploadDate: "2023-02-18",
      fileType: "MP4",
      fileSize: "127.5 MB",
      thumbnailUrl: "/placeholder.svg?height=120&width=200",
      duration: "3:45",
      url: "#",
      color: "from-rose-500 to-red-600",
    },
    {
      id: 4,
      name: "Product Showcase Video",
      type: "video",
      description: "Detailed demonstration of our flagship products and their features.",
      uploadDate: "2023-05-22",
      fileType: "MP4",
      fileSize: "215.8 MB",
      thumbnailUrl: "/placeholder.svg?height=120&width=200",
      duration: "5:30",
      url: "#",
      color: "from-orange-500 to-amber-600",
    },
    {
      id: 5,
      name: "Testimonial - ABC Corporation",
      type: "testimonial",
      description: "Feedback from our valued client about their experience with our products.",
      uploadDate: "2023-04-05",
      fileType: "PDF",
      fileSize: "1.2 MB",
      author: "John Smith",
      authorRole: "Chief Operations Officer",
      authorCompany: "ABC Corporation",
      url: "#",
      color: "from-purple-500 to-violet-600",
    },
    {
      id: 6,
      name: "Industrial Solutions Brochure",
      type: "catalog",
      description: "Specialized catalog focused on our industrial solutions and services.",
      uploadDate: "2023-06-10",
      fileType: "PDF",
      fileSize: "18.4 MB",
      url: "#",
      color: "from-cyan-500 to-blue-600",
    },
  ])

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleDelete = () => {
    if (itemToDelete !== null) {
      setMediaItems(mediaItems.filter((item) => item.id !== itemToDelete))
      toast({
        title: "Item deleted",
        description: "The multimedia item has been removed successfully.",
      })
      setIsDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const confirmDelete = (id: number) => {
    setItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const filteredItems = mediaItems.filter((item) => {
    // Filter by search query
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "profiles") return matchesSearch && item.type === "profile"
    if (activeTab === "catalogs") return matchesSearch && item.type === "catalog"
    if (activeTab === "videos") return matchesSearch && item.type === "video"
    if (activeTab === "testimonials") return matchesSearch && item.type === "testimonial"

    return matchesSearch
  })

  const getIconForType = (type: MediaType) => {
    switch (type) {
      case "profile":
        return <BookOpen className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
      case "catalog":
        return <FileImage className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
      case "video":
        return <Video className="h-3.5 w-3.5 mr-1.5 text-rose-500" />
      case "testimonial":
        return <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
      default:
        return <FileText className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Multimedia</h1>
            <p className="text-gray-500 text-sm">Manage company profiles, product catalogs, videos and testimonials</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all text-xs" asChild>
              <Link href="/dashboard/multimedia/upload">
                <Upload className="mr-2 h-3.5 w-3.5" />
                Upload Media
              </Link>
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-xs shadow-sm" asChild>
              <Link href="/dashboard/documents">
                <FileText className="mr-2 h-3.5 w-3.5" />
                Documents
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              placeholder="Search media..."
              className="pl-9 h-9 text-xs bg-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs h-9 border-gray-300 shadow-sm">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All Media</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("profiles")}>Company Profiles</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("catalogs")}>Product Catalogs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("videos")}>Videos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("testimonials")}>Client Testimonials</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/60 border border-gray-200 p-0.5">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="profiles" className="text-xs">Profiles</TabsTrigger>
            <TabsTrigger value="catalogs" className="text-xs">Catalogs</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
            <TabsTrigger value="testimonials" className="text-xs">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <MediaCard 
                  key={item.id} 
                  item={item} 
                  onDelete={confirmDelete} 
                  getIcon={getIconForType}
                />
              ))}
            </div>
          </TabsContent>

          {["profiles", "catalogs", "videos", "testimonials"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <MediaCard 
                    key={item.id} 
                    item={item} 
                    onDelete={confirmDelete} 
                    getIcon={getIconForType}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white/60 rounded-lg border border-gray-200 shadow-sm">
            <FileImage className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-4 text-base font-medium">No multimedia found</h3>
            <p className="mt-1 text-xs text-gray-500">
              {searchQuery ? "Try adjusting your search or filters" : "Upload your first media item to get started"}
            </p>
            <Button 
              className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs h-9 px-4 shadow-sm"
              asChild
            >
              <Link href="/dashboard/multimedia/upload">
                <Upload className="mr-2 h-3.5 w-3.5" />
                Upload Media
              </Link>
            </Button>
          </div>
        )}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-xs pt-2">
                Are you sure you want to delete this media item? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="text-xs h-8">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function MediaCard({ 
  item, 
  onDelete,
  getIcon
}: { 
  item: MediaItem; 
  onDelete: (id: number) => void;
  getIcon: (type: MediaType) => React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg border-0">
      <div className={`h-2 w-full bg-gradient-to-r ${item.color}`}></div>
      
      {item.type === 'video' && item.thumbnailUrl && (
        <div className="relative">
          <img 
            src={item.thumbnailUrl} 
            alt={item.name} 
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-3">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
            {item.duration && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {item.duration}
              </div>
            )}
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3 relative">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-white/80 to-transparent z-0"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <div className="flex items-center">
              {getIcon(item.type)}
              <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
            </div>
            <CardDescription className="text-xs flex items-center">
              {item.type === 'profile' && 'Company Profile'}
              {item.type === 'catalog' && 'Product Catalog'}
              {item.type === 'video' && 'Video'}
              {item.type === 'testimonial' && 'Client Testimonial'}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem asChild>
                <Link href={item.url} className="flex w-full cursor-pointer">
                  {item.type === 'video' ? (
                    <>
                      <Play className="mr-2 h-3.5 w-3.5" />
                      Play Video
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Download
                    </>
                  )}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/multimedia/edit/${item.id}`} className="flex w-full cursor-pointer">
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => onDelete(item.id)}>
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
          
          {item.type === 'testimonial' && item.author && (
            <div className="flex items-start space-x-2 mt-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={`/placeholder.svg?height=28&width=28&text=${item.author.substring(0, 2)}`} />
                <AvatarFallback className="text-[10px]">{item.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">{item.author}</p>
                <p className="text-[10px] text-gray-500">{item.authorRole}, {item.authorCompany}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between group">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
              <span>Uploaded:</span>
            </div>
            <span className="text-xs font-medium">{new Date(item.uploadDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center text-xs text-gray-500">
              <FileText className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
              <span>{item.fileType || 'File'}:</span>
            </div>
            <span className="text-xs font-medium">{item.fileSize}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-end">
        <Button 
          variant="outline" 
          asChild 
          className="text-xs h-8 border-gray-300 shadow-sm" 
          size="sm"
        >
          <Link href={item.url}>
            {item.type === 'video' ? (
              <>
                <Play className="mr-1.5 h-3 w-3" />
                View
              </>
            ) : (
              <>
                <ExternalLink className="mr-1.5 h-3 w-3" />
                View
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 