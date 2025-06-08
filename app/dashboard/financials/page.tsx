"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Upload, Download, FileText, Wallet, BarChart3, 
  Users, Lock, Eye, EyeOff, AlertTriangle, HelpCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Types
interface FinancialDocument {
  id: string;
  title: string;
  type: "balance_sheet" | "profit_loss" | "shareholding" | "annual_report" | "tax" | "other";
  year: string;
  uploadDate: string;
  isPublic: boolean;
  fileSize: string;
  fileType: string;
}

export default function FinancialsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("documents");
  
  // Sample financial documents
  const [financialDocuments, setFinancialDocuments] = useState<FinancialDocument[]>([
    {
      id: "1",
      title: "Balance Sheet 2023",
      type: "balance_sheet",
      year: "2023",
      uploadDate: "2023-12-15",
      isPublic: false,
      fileSize: "1.2 MB",
      fileType: "PDF"
    },
    {
      id: "2",
      title: "Profit & Loss Statement 2023",
      type: "profit_loss",
      year: "2023",
      uploadDate: "2023-12-15",
      isPublic: false,
      fileSize: "850 KB",
      fileType: "PDF"
    },
    {
      id: "3",
      title: "Shareholding Structure",
      type: "shareholding",
      year: "2023",
      uploadDate: "2023-11-10",
      isPublic: true,
      fileSize: "620 KB",
      fileType: "PDF"
    },
    {
      id: "4",
      title: "Annual Report 2023",
      type: "annual_report",
      year: "2023",
      uploadDate: "2023-12-20",
      isPublic: true,
      fileSize: "3.5 MB",
      fileType: "PDF"
    }
  ]);
  
  // Action handlers
  const toggleDocumentVisibility = (id: string) => {
    setFinancialDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, isPublic: !doc.isPublic } : doc
      )
    );
    
    toast({
      title: "Document visibility updated",
      description: "The document visibility has been updated.",
    });
  };
  
  const handleUpload = () => {
    toast({
      title: "Feature in development",
      description: "The ability to upload financial documents is coming soon.",
    });
  };
  
  const handleDownload = (id: string) => {
    toast({
      title: "Feature in development",
      description: "The ability to download financial documents is coming soon.",
    });
  };

  // Icons for document types
  const getDocumentTypeIcon = (type: FinancialDocument["type"]) => {
    switch (type) {
      case "balance_sheet":
        return <Wallet className="h-4 w-4 text-blue-500" />;
      case "profit_loss":
        return <BarChart3 className="h-4 w-4 text-emerald-500" />;
      case "shareholding":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "annual_report":
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Financial Information</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Financial disclosure is optional and can help build trust with potential clients. Your privacy controls allow you to decide what information to share.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-500 text-sm">Manage and disclose your company's financial information (optional)</p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
              onClick={handleUpload}
            >
              <Upload className="mr-2 h-3.5 w-3.5" />
              Upload Financial Document
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-800 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Financial disclosure is optional</p>
              <p className="mt-1">Sharing financial information is entirely voluntary. You can control what information is visible to clients and procurement teams. Public documents will be available to verified buyers only.</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/60 border border-gray-200 p-0.5">
            <TabsTrigger value="documents" className="text-xs">Financial Documents</TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs">Privacy Information</TabsTrigger>
          </TabsList>

          {/* Financial Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
                <CardTitle className="text-lg">Financial Documents</CardTitle>
                <CardDescription>
                  Upload and manage your company's financial statements and reports
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {financialDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {financialDocuments.map((document) => (
                      <div 
                        key={document.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-4 sm:mb-0">
                          <div className="p-2 bg-gray-100 rounded-md">
                            {getDocumentTypeIcon(document.type)}
                          </div>
                          <div>
                            <div className="font-medium">{document.title}</div>
                            <div className="text-sm text-gray-500">
                              {document.fileSize} • {document.fileType} • Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-10 sm:ml-0">
                          <Badge 
                            variant="outline" 
                            className={
                              document.isPublic 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }
                          >
                            {document.isPublic ? 'Public' : 'Private'}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => toggleDocumentVisibility(document.id)}
                            >
                              {document.isPublic ? 
                                <Eye className="h-4 w-4 text-gray-500" /> : 
                                <EyeOff className="h-4 w-4 text-gray-500" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleDownload(document.id)}
                            >
                              <Download className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 px-4">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No Financial Documents Added Yet</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mt-2 mb-6">
                      Upload your financial documents to share with potential clients. You can control which documents are public or private.
                    </p>
                    <Button onClick={handleUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload First Document
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="py-4 px-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <span className="text-xs text-gray-500">Documents are shared only with verified buyers and procurement teams</span>
                <Button 
                  variant="outline" 
                  className="text-xs"
                  onClick={handleUpload}
                >
                  <Upload className="h-3.5 w-3.5 mr-2" />
                  Upload Document
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
                <CardTitle className="text-lg">Common Financial Documents</CardTitle>
                <CardDescription>
                  Examples of financial information you can provide
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-blue-500" />
                      <h3 className="font-medium">Balance Sheet</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      A snapshot of your company's assets, liabilities, and shareholders' equity at a specific point in time.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-emerald-500" />
                      <h3 className="font-medium">Profit & Loss Statement</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      A summary of your company's revenues, costs, and expenses over a specific period.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <h3 className="font-medium">Shareholding Structure</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Information about your company's ownership and major shareholders or investors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Information Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
                <CardTitle className="text-lg">Privacy Information</CardTitle>
                <CardDescription>
                  Important information about financial disclosure
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-800 mb-6">
                  <h3 className="font-medium flex items-center gap-1.5 mb-2">
                    <Lock className="h-4 w-4" />
                    Your Data is Protected
                  </h3>
                  <p className="text-sm">
                    Financial disclosure is completely optional. All documents you upload are encrypted and accessible only to verified buyers and procurement professionals.
                  </p>
                </div>

                <h3 className="font-medium mb-4">How We Protect Your Financial Information</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                      <Lock className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Controlled Access</h4>
                      <p className="text-sm text-gray-600 mt-1">Your financial documents are only accessible to verified procurement professionals from legitimate companies.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="bg-emerald-100 rounded-full p-1.5 mt-0.5">
                      <Eye className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visibility Controls</h4>
                      <p className="text-sm text-gray-600 mt-1">You decide which documents are public or private, and you can change these settings at any time.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="bg-amber-100 rounded-full p-1.5 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Optional Disclosure</h4>
                      <p className="text-sm text-gray-600 mt-1">Sharing financial information is completely voluntary, though it may help build trust with potential clients.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-sm text-gray-500 border-t pt-6">
                  <p>For more information about how we handle your data, please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> or contact our support team.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 