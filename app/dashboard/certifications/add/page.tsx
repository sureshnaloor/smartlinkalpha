"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Upload, Calendar, Building, Save, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Certification name must be at least 2 characters.",
  }),
  issuer: z.string().min(2, {
    message: "Issuer name must be at least 2 characters.",
  }),
  issueDate: z.string().min(1, {
    message: "Issue date is required.",
  }),
  expiryDate: z.string().min(1, {
    message: "Expiry date is required.",
  }),
  certificateNumber: z.string().optional(),
  document: z.any().optional(),
})

export default function AddCertificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      certificateNumber: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Certification added",
        description: "Your certification has been added successfully.",
      })
      router.push("/dashboard/certifications")
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
            <Link href="/dashboard/certifications">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Certifications
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Add Certification</h1>
            <p className="text-gray-500 text-sm">Add a new certification or compliance document</p>
          </div>
        </div>

        <Card className="border border-gray-200 shadow-md">
          <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
            <CardTitle className="text-base font-medium">Certification Details</CardTitle>
            <CardDescription className="text-xs mt-1">
              Enter the details of your certification or compliance document
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
                      <FormLabel className="text-sm font-medium">Certification Name</FormLabel>
                      <FormControl>
                        <Input 
                          className="h-9 text-sm bg-white/70"
                          placeholder="e.g., ISO 9001:2015" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter the full name of the certification or standard
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Issuing Organization</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                          <Input
                            className="pl-9 h-9 text-sm bg-white/70"
                            placeholder="e.g., International Organization for Standardization"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        The organization that issued the certification
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Issue Date</FormLabel>
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
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Expiry Date</FormLabel>
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
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="certificateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Certificate Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          className="h-9 text-sm bg-white/70"
                          placeholder="e.g., ISO-9001-12345" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        The unique identifier or reference number for this certification
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
                      <FormLabel className="text-sm font-medium">Upload Certificate</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-5 text-center hover:bg-gray-50/70 transition-colors cursor-pointer bg-white/30">
                          <input
                            type="file"
                            id="document-upload"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            disabled={isLoading}
                          />
                          <label htmlFor="document-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-7 w-7 text-gray-400" />
                              <div className="font-medium text-sm">
                                {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                              </div>
                              <div className="text-xs text-gray-500">PDF, JPG or PNG (max. 10MB)</div>
                            </div>
                          </label>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Upload a scanned copy of your certificate
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
                  <Link href="/dashboard/certifications">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="text-xs h-9 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-3.5 w-3.5" />
                      Save Certification
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
