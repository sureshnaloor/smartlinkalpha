"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, FileText, Download, Trash2, Edit, Calendar, CheckCircle, AlertCircle } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function CertificationsPage() {
  const { toast } = useToast()
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      issueDate: "2023-05-15",
      expiryDate: "2025-05-15",
      status: "active",
      documentUrl: "#",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "OHSAS 18001",
      issuer: "Occupational Health and Safety Assessment Series",
      issueDate: "2022-08-10",
      expiryDate: "2025-08-10",
      status: "active",
      documentUrl: "#",
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: 3,
      name: "API Certification",
      issuer: "American Petroleum Institute",
      issueDate: "2021-11-20",
      expiryDate: "2024-11-20",
      status: "expiring-soon",
      documentUrl: "#",
      color: "from-amber-500 to-yellow-400",
    },
  ])

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [certificationToDelete, setCertificationToDelete] = useState<number | null>(null)

  const handleDelete = () => {
    if (certificationToDelete !== null) {
      setCertifications(certifications.filter((cert) => cert.id !== certificationToDelete))
      toast({
        title: "Certification deleted",
        description: "The certification has been removed successfully.",
      })
      setIsDeleteDialogOpen(false)
      setCertificationToDelete(null)
    }
  }

  const confirmDelete = (id: number) => {
    setCertificationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
            <p className="text-gray-500 text-sm">Manage your company certifications and compliance documents</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all" asChild>
            <Link href="/dashboard/certifications/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Certification
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card 
              key={cert.id} 
              className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg border-0"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${cert.color}`}></div>
              <CardHeader className="pb-3 relative">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-white/80 to-transparent z-0"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold">{cert.name}</CardTitle>
                    <CardDescription className="text-xs">{cert.issuer}</CardDescription>
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
                        <Link href={`/dashboard/certifications/edit/${cert.id}`} className="flex w-full cursor-pointer">
                          <Edit className="mr-2 h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={cert.documentUrl} className="flex w-full cursor-pointer">
                          <Download className="mr-2 h-3.5 w-3.5" />
                          Download
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => confirmDelete(cert.id)}
                      >
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
                      <span>Issue Date:</span>
                    </div>
                    <span className="text-xs font-medium">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3.5 w-3.5 group-hover:text-blue-500 transition-colors" />
                      <span>Expiry Date:</span>
                    </div>
                    <span className="text-xs font-medium">{new Date(cert.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="mr-1 h-3.5 w-3.5" />
                      <span>Status:</span>
                    </div>
                    {cert.status === "active" ? (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-xs py-0.5">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                    ) : cert.status === "expiring-soon" ? (
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
          ))}
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription className="text-xs pt-2">
                Are you sure you want to delete this certification? This action cannot be undone.
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
