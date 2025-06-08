"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, FileImage, Video, FileText, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function UploadMediaPage() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [mediaType, setMediaType] = useState<string>("profile");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is just a placeholder for future implementation
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Feature in development",
        description: "Media upload functionality is coming soon.",
      });
    }, 1000);
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "profile":
        return <FileText className="h-5 w-5" />;
      case "catalog":
        return <FileImage className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "testimonial":
        return <Paperclip className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-4" asChild>
            <Link href="/dashboard/multimedia">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Upload Media</h1>
            <p className="text-gray-500 text-sm">Add new multimedia content to your profile</p>
          </div>
        </div>

        <Tabs defaultValue="profile" value={mediaType} onValueChange={setMediaType} className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-white/60 border border-gray-200 p-1">
            <TabsTrigger value="profile" className="text-xs flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              Company Profile
            </TabsTrigger>
            <TabsTrigger value="catalog" className="text-xs flex items-center gap-1">
              <FileImage className="h-3.5 w-3.5" />
              Product Catalog
            </TabsTrigger>
            <TabsTrigger value="video" className="text-xs flex items-center gap-1">
              <Video className="h-3.5 w-3.5" />
              Video
            </TabsTrigger>
            <TabsTrigger value="testimonial" className="text-xs flex items-center gap-1">
              <Paperclip className="h-3.5 w-3.5" />
              Testimonial
            </TabsTrigger>
          </TabsList>

          {/* Common upload form for all media types */}
          <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                {getMediaTypeIcon(mediaType)}
                <CardTitle className="text-lg">
                  Upload {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
                </CardTitle>
              </div>
              <CardDescription>
                Add your multimedia content to showcase to potential clients and partners.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Title</Label>
                  <Input id="name" placeholder="Enter a title for your media" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of this media"
                    className="min-h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="marketing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing Materials</SelectItem>
                        <SelectItem value="technical">Technical Documents</SelectItem>
                        <SelectItem value="corporate">Corporate Information</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="restricted">Restricted Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : "Drag and drop your file here or click to browse"}
                      </div>
                      <p className="text-xs text-gray-500">
                        {mediaType === "video" 
                          ? "Supports: MP4, WEBM, MOV (max. 250MB)" 
                          : "Supports: PDF, PNG, JPG, DOCX (max. 50MB)"}
                      </p>
                      <Input 
                        id="file" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileSelect}
                        accept={mediaType === "video" 
                          ? ".mp4,.webm,.mov" 
                          : ".pdf,.png,.jpg,.jpeg,.docx"} 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-gray-50/50 p-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/multimedia">Cancel</Link>
              </Button>
              <Button 
                type="submit" 
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isUploading ? "Uploading..." : "Upload Media"}
              </Button>
            </CardFooter>
          </Card>
        </Tabs>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 mt-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Note:</span> This feature is currently under development. The upload functionality will be available soon.
          </div>
        </div>
      </div>
    </div>
  );
} 