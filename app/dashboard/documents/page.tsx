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
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Building,
  FileCheck,
  FileSpreadsheet
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

type Document = {
  id: number
  name: string
  category: "Registration" | "Tax" | "Compliance" | "License" | "Other"
  uploadDate: string
  expiryDate?: string
  status: "active" | "expiring-soon" | "expired"
  fileType: string
  fileSize: string
  url: string
  color: string
}

export default function DocumentsPage() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Company Registration Certificate",
      category: "Registration",
      uploadDate: "2023-05-15",
      expiryDate: "2025-05-15",
      status: "active",
      fileType: "PDF",
      fileSize: "1.2 MB",
      url: "#",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "VAT Certificate",
      category: "Tax",
      uploadDate: "2023-06-10",
      expiryDate: "2024-06-10",
      status: "active",
      fileType: "PDF",
      fileSize: "0.8 MB",
      url: "#",
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: 3,
      name: "ZAKAT Certificate",
      category: "Tax",
      uploadDate: "2023-01-20",
      expiryDate: "2024-01-20",
      status: "active",
      fileType: "PDF",
      fileSize: "0.7 MB",
      url: "#",
      color: "from-indigo-500 to-purple-400",
    },
    {
      id: 4,
      name: "GOSI Certificate",
      category: "Compliance",
      uploadDate: "2023-03-05",
      expiryDate: "2023-12-25",
      status: "expiring-soon",
      fileType: "PDF",
      fileSize: "0.9 MB",
      url: "#",
      color: "from-amber-500 to-yellow-400",
    },
    {
      id: 5,
      name: "Civil Defense Certificate",
      category: "Compliance",
      uploadDate: "2022-07-12",
      expiryDate: "2023-07-12",
      status: "expired",
      fileType: "PDF",
      fileSize: "1.1 MB",
      url: "#",
      color: "from-rose-500 to-pink-400",
    },
    {
      id: 6,
      name: "Bank Letter",
      category: "Other",
      uploadDate: "2023-04-18",
      status: "active",
      fileType: "PDF",
      fileSize: "0.5 MB",
      url: "#",
      color: "from-sky-500 to-blue-400",
    },
    {
      id: 7,
      name: "Saudization Certificate",
      category: "Compliance",
      uploadDate: "2023-02-22",
      expiryDate: "2024-02-22",
      status: "active",
      fileType: "PDF",
      fileSize: "0.6 MB",
      url: "#",
      color: "from-green-500 to-emerald-400",
    },
    {
      id: 8,
      name: "Partnership Contract/MOU",
      category: "Registration",
      uploadDate: "2022-11-05",
      status: "active",
      fileType: "PDF",
      fileSize: "2.3 MB",
      url: "#",
      color: "from-purple-500 to-violet-400",
    },
    {
      id: 9,
      name: "Industrial License",
      category: "License",
      uploadDate: "2023-01-30",
      expiryDate: "2025-01-30",
      status: "active",
      fileType: "PDF",
      fileSize: "1.4 MB",
      url: "#",
      color: "from-orange-500 to-amber-400",
    },
    {
      id: 10,
      name: "Investment License",
      category: "License",
      uploadDate: "2022-09-15",
      expiryDate: "2024-09-15",
      status: "active",
      fileType: "PDF",
      fileSize: "1.2 MB",
      url: "#",
      color: "from-cyan-500 to-blue-400",
    },
    {
      id: 11,
      name: "Appreciation Certificate",
      category: "Other",
      uploadDate: "2023-03-12",
      status: "active",
      fileType: "PDF",
      fileSize: "1.0 MB",
      url: "#",
      color: "from-yellow-500 to-amber-400",
    },
  ])

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleDelete = () => {
    if (documentToDelete !== null) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete))
      toast({
        title: "Document deleted",
        description: "The document has been removed successfully.",
      })
      setIsDeleteDialogOpen(false)
      setDocumentToDelete(null)
    }
  }

  const confirmDelete = (id: number) => {
    setDocumentToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const filteredDocuments = documents.filter((doc) => {
    // Filter by search query
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "registration") return matchesSearch && doc.category === "Registration"
    if (activeTab === "tax") return matchesSearch && doc.category === "Tax"
    if (activeTab === "compliance") return matchesSearch && doc.category === "Compliance"
    if (activeTab === "license") return matchesSearch && doc.category === "License"
    if (activeTab === "other") return matchesSearch && doc.category === "Other"

    return matchesSearch
  })

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Registration":
        return <Building className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
      case "Tax":
        return <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
      case "Compliance":
        return <FileCheck className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
      case "License":
        return <FileText className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
      default:
        return <FileText className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Company Documents</h1>
            <p className="text-gray-500 text-sm">Manage certificates, licenses, and regulatory compliance documents</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all text-xs" asChild>
              <Link href="/dashboard/documents/upload">
                <PlusCircle className="mr-2 h-3.5 w-3.5" />
                Upload Document
              </Link>
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-xs shadow-sm" asChild>
              <Link href="/dashboard/multimedia">
                <FileText className="mr-2 h-3.5 w-3.5" />
                Multimedia
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              placeholder="Search documents..."
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
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All Documents</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("registration")}>Registration</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("tax")}>Tax</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("compliance")}>Compliance</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("license")}>Licenses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("other")}>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/60 border border-gray-200 p-0.5">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="registration" className="text-xs">Registration</TabsTrigger>
            <TabsTrigger value="tax" className="text-xs">Tax</TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">Compliance</TabsTrigger>
            <TabsTrigger value="license" className="text-xs">Licenses</TabsTrigger>
            <TabsTrigger value="other" className="text-xs">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onDelete={confirmDelete} 
                  getIcon={getIconForCategory}
                />
              ))}
            </div>
          </TabsContent>

          {["registration", "tax", "compliance", "license", "other"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    document={doc} 
                    onDelete={confirmDelete} 
                    getIcon={getIconForCategory}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 bg-white/60 rounded-lg border border-gray-200 shadow-sm">
            <FileText className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-4 text-base font-medium">No documents found</h3>
            <p className="mt-1 text-xs text-gray-500">
              {searchQuery ? "Try adjusting your search or filters" : "Upload your first document to get started"}
            </p>
            <Button 
              className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs h-9 px-4 shadow-sm"
              asChild
            >
              <Link href="/dashboard/documents/upload">
                <PlusCircle className="mr-2 h-3.5 w-3.5" />
                Upload Document
              </Link>
            </Button>
          </div>
        )}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-xs pt-2">
                Are you sure you want to delete this document? This action cannot be undone.
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

function DocumentCard({ 
  document, 
  onDelete,
  getIcon
}: { 
  document: Document; 
  onDelete: (id: number) => void;
  getIcon: (category: string) => React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg border-0">
      <div className={`h-2 w-full bg-gradient-to-r ${document.color}`}></div>
      <CardHeader className="pb-3 relative">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-white/80 to-transparent z-0"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <div className="flex items-center">
              {getIcon(document.category)}
              <CardTitle className="text-base font-semibold">{document.name}</CardTitle>
            </div>
            <CardDescription className="text-xs flex items-center">
              {document.category}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem asChild>
                <Link href={document.url} className="flex w-full cursor-pointer">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/documents/edit/${document.id}`} className="flex w-full cursor-pointer">
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => onDelete(document.id)}>
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between group">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
              <span>Uploaded:</span>
            </div>
            <span className="text-xs font-medium">{new Date(document.uploadDate).toLocaleDateString()}</span>
          </div>

          {document.expiryDate && (
            <div className="flex items-center justify-between group">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
                <span>Expires:</span>
              </div>
              <span className="text-xs font-medium">{new Date(document.expiryDate).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center justify-between group">
            <div className="flex items-center text-xs text-gray-500">
              <FileText className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
              <span>Type:</span>
            </div>
            <span className="text-xs font-medium">
              {document.fileType} ({document.fileSize})
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center text-xs text-gray-500">
              <FileText className="mr-1 h-3.5 w-3.5" />
              <span>Status:</span>
            </div>
            {document.status === "active" ? (
              <Badge className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-xs py-0.5">
                <CheckCircle className="mr-1 h-3 w-3" />
                Active
              </Badge>
            ) : document.status === "expiring-soon" ? (
              <Badge variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50 transition-colors text-xs py-0.5">
                <AlertCircle className="mr-1 h-3 w-3" />
                Expiring Soon
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs py-0.5">
                <AlertCircle className="mr-1 h-3 w-3" />
                Expired
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
