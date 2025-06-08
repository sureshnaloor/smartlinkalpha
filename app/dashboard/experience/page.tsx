"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, Search, Filter, ArrowUpDown, MoreHorizontal, Calendar, 
  FileText, Building, Briefcase, CheckCircle, 
  Clock, AlertCircle, DollarSign, Globe, Package, Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Types for services projects
type ProjectStatus = "completed" | "in-progress" | "awarded";

interface ServiceProject {
  id: string;
  projectName: string;
  value: string;
  year: string;
  client: string;
  hasTestimonial: boolean;
  hasCertificate: boolean;
  status: ProjectStatus;
  description: string;
}

// Types for materials
interface Material {
  id: string;
  productName: string;
  category: string;
  majorClients: string[];
  exportMarkets: string[];
  yearIntroduced: string;
  description: string;
}

// Sample data for services projects
const sampleServiceProjects: ServiceProject[] = [
  {
    id: "1",
    projectName: "Corporate Headquarters Renovation",
    value: "$2,500,000",
    year: "2023",
    client: "ABC Corporation",
    hasTestimonial: true,
    hasCertificate: true,
    status: "completed",
    description: "Complete renovation of 50,000 sq ft corporate headquarters including structural improvements, interior design, and smart building technology integration."
  },
  {
    id: "2",
    projectName: "Hospital Wing Construction",
    value: "$12,750,000",
    year: "2022",
    client: "City Medical Center",
    hasTestimonial: true,
    hasCertificate: true,
    status: "completed",
    description: "Construction of new 35,000 sq ft hospital wing with specialized medical infrastructure and facilities."
  },
  {
    id: "3",
    projectName: "Industrial Facility Expansion",
    value: "$8,300,000",
    year: "2023",
    client: "Industrial Manufacturing Inc.",
    hasTestimonial: false,
    hasCertificate: true,
    status: "in-progress",
    description: "Design and construction of 70,000 sq ft manufacturing facility expansion with advanced automation systems."
  },
  {
    id: "4",
    projectName: "Municipal Water Treatment Plant",
    value: "$15,200,000",
    year: "2022",
    client: "Westside Municipality",
    hasTestimonial: false,
    hasCertificate: false,
    status: "awarded",
    description: "Design-build project for a new municipal water treatment plant with capacity of 5 million gallons per day."
  },
  {
    id: "5",
    projectName: "University Campus Dormitories",
    value: "$9,500,000",
    year: "2021",
    client: "State University",
    hasTestimonial: true,
    hasCertificate: true,
    status: "completed",
    description: "Construction of three 6-story dormitory buildings with 300 rooms and modern amenities."
  }
];

// Sample data for materials
const sampleMaterials: Material[] = [
  {
    id: "1",
    productName: "High-Tensile Steel Beams",
    category: "Construction Materials",
    majorClients: ["Global Construction Co.", "Skyscraper Builders Inc.", "Metropolitan Development"],
    exportMarkets: ["Canada", "Mexico", "Brazil", "Chile"],
    yearIntroduced: "2019",
    description: "Premium grade high-tensile steel beams for commercial and industrial construction projects."
  },
  {
    id: "2",
    productName: "Eco-Friendly Concrete Mix",
    category: "Green Building Materials",
    majorClients: ["Sustainable Structures LLC", "Green Building Associates", "EcoHome Developers"],
    exportMarkets: ["Germany", "France", "United Kingdom", "Spain"],
    yearIntroduced: "2020",
    description: "Environmentally friendly concrete mix using 40% recycled materials with reduced carbon footprint."
  },
  {
    id: "3",
    productName: "Smart Glass Panels",
    category: "Advanced Building Materials",
    majorClients: ["Tech Innovations Corp", "Modern Architecture Group", "Smart Buildings Inc."],
    exportMarkets: ["Japan", "South Korea", "Singapore", "Australia"],
    yearIntroduced: "2021",
    description: "Electrochromic glass panels that adjust transparency based on ambient light conditions, improving energy efficiency."
  },
  {
    id: "4",
    productName: "Composite Decking Materials",
    category: "Outdoor Construction",
    majorClients: ["Luxury Homes Ltd", "Resort Developers", "Commercial Properties Group"],
    exportMarkets: ["United Arab Emirates", "Saudi Arabia", "Qatar"],
    yearIntroduced: "2018",
    description: "Weather-resistant composite decking materials made from recycled plastics and sustainable wood fibers."
  }
];

export default function ExperiencePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  
  // Filter services based on search query
  const filteredServiceProjects = sampleServiceProjects.filter(project => 
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter materials based on search query
  const filteredMaterials = sampleMaterials.filter(material => 
    material.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.majorClients.some(client => client.toLowerCase().includes(searchQuery.toLowerCase())) ||
    material.exportMarkets.some(market => market.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Action handlers (placeholders)
  const handleAddNew = () => {
    toast({
      title: "Feature in development",
      description: "The ability to add new projects or materials is coming soon.",
    });
  };
  
  const handleViewDetails = (id: string, type: 'service' | 'material') => {
    toast({
      title: "Feature in development",
      description: `Details view for ${type} (ID: ${id}) is coming soon.`,
    });
  };
  
  const getStatusBadge = (status: ProjectStatus) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">In Progress</Badge>;
      case "awarded":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Awarded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusIcon = (status: ProjectStatus) => {
    switch(status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "awarded":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Past Experience</h1>
            <p className="text-gray-500 text-sm">Showcase your projects, products, and client relationships</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all text-xs" onClick={handleAddNew}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add New
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              placeholder="Search experience..."
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
              <DropdownMenuItem onClick={() => setActiveTab("services")}>Services Projects</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("materials")}>Materials & Products</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/60 border border-gray-200 p-0.5">
            <TabsTrigger value="services" className="text-xs">Services & Projects</TabsTrigger>
            <TabsTrigger value="materials" className="text-xs">Materials & Products</TabsTrigger>
          </TabsList>

          {/* Services Projects Tab Content */}
          <TabsContent value="services" className="space-y-4">
            {filteredServiceProjects.length > 0 ? (
              <div className="grid gap-4">
                {filteredServiceProjects.map(project => (
                  <Card key={project.id} className="overflow-hidden border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="p-5 bg-white border-b border-gray-100">
                      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-blue-500" />
                            <CardTitle className="text-lg font-semibold">{project.projectName}</CardTitle>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(project.status)}
                          <div className="md:hidden">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem onClick={() => handleViewDetails(project.id, 'service')}>
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-500 text-xs">Client</div>
                        <div className="font-medium flex items-center gap-1.5">
                          <Building className="h-3.5 w-3.5 text-gray-400" />
                          {project.client}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-500 text-xs">Year</div>
                        <div className="font-medium flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {project.year}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-500 text-xs">Project Value</div>
                        <div className="font-medium flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                          {project.value}
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-3 flex items-center gap-4 mt-2">
                        {project.hasTestimonial && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Client Testimonial
                          </Badge>
                        )}
                        {project.hasCertificate && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            Completion Certificate
                          </Badge>
                        )}
                        <div className="ml-auto hidden md:block">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs"
                            onClick={() => handleViewDetails(project.id, 'service')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200 bg-white shadow-sm p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <h3 className="font-medium">No projects found</h3>
                  <p className="text-sm text-gray-500">Add your past projects or try a different search term.</p>
                  <Button className="mt-4" onClick={handleAddNew}>
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add First Project
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Materials Tab Content */}
          <TabsContent value="materials" className="space-y-4">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-4">
                {filteredMaterials.map(material => (
                  <Card key={material.id} className="overflow-hidden border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="p-5 bg-white border-b border-gray-100">
                      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-emerald-500" />
                            <CardTitle className="text-lg font-semibold">{material.productName}</CardTitle>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {material.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
                            {material.category}
                          </Badge>
                          <div className="md:hidden">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem onClick={() => handleViewDetails(material.id, 'material')}>
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="text-gray-500 text-xs">Year Introduced</div>
                          <div className="font-medium flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {material.yearIntroduced}
                          </div>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <div className="text-gray-500 text-xs">Major Clients</div>
                          <div className="flex flex-wrap gap-2">
                            {material.majorClients.map((client, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Users className="h-3 w-3 mr-1" />
                                {client}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-gray-500 text-xs">Export Markets</div>
                        <div className="flex flex-wrap gap-2">
                          {material.exportMarkets.map((market, index) => (
                            <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              <Globe className="h-3 w-3 mr-1" />
                              {market}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-xs hidden md:flex"
                          onClick={() => handleViewDetails(material.id, 'material')}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200 bg-white shadow-sm p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Package className="h-8 w-8 text-gray-400" />
                  <h3 className="font-medium">No materials found</h3>
                  <p className="text-sm text-gray-500">Add your product catalog or try a different search term.</p>
                  <Button className="mt-4" onClick={handleAddNew}>
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add First Product
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 