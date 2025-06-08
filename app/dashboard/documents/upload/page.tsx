"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Upload, Calendar, FileText, Save, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Document name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  expiryDate: z.string().optional(),
  document: z.any().optional(),
})

export default function UploadDocumentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      expiryDate: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully.",
      })
      router.push("/dashboard/documents")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-xs h-8 gap-1.5 transition-colors hover:bg-zinc-100" asChild>
            <Link href="/dashboard/documents">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Documents
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Upload Document</h1>
            <p className="text-gray-500 text-sm">Upload a new document, brochure, or catalog</p>
          </div>
        </div>

        <Card className="border border-gray-200 shadow-md">
          <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
            <CardTitle className="text-base font-medium">Document Details</CardTitle>
            <CardDescription className="text-xs mt-1">
              Enter the details of your document and upload the file
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-5 pt-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Document Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <Input
                            className="pl-9 h-9 text-sm bg-white/70"
                            placeholder="e.g., Company Brochure 2025"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter a descriptive name for your document
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger className="h-9 text-sm bg-white/70">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Certification">Certification</SelectItem>
                          <SelectItem value="Compliance">Compliance</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Financial">Financial</SelectItem>
                          <SelectItem value="Project">Project</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Select the category that best describes this document
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <Input 
                            className="pl-9 h-9 text-sm bg-white/70" 
                            type="date" 
                            {...field} 
                            disabled={isLoading} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        If this document has an expiration date, please specify
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Upload Document</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-5 text-center hover:bg-gray-50/70 transition-colors cursor-pointer bg-white/30">
                          <input
                            type="file"
                            id="document-upload"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            disabled={isLoading}
                          />
                          <label htmlFor="document-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-7 w-7 text-gray-400" />
                              <div className="font-medium text-sm">
                                {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                              </div>
                              <div className="text-xs text-gray-500">PDF, DOC, DOCX, JPG or PNG (max. 20MB)</div>
                            </div>
                          </label>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Upload your document file
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between py-4 px-6 border-t border-gray-100 bg-gray-50/50">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="text-xs h-9 px-4 border-gray-300" 
                  asChild
                >
                  <Link href="/dashboard/documents">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="text-xs h-9 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0 shadow-sm"
                  disabled={isLoading || !selectedFile}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-3.5 w-3.5" />
                      Upload Document
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
