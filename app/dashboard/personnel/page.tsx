"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  PlusCircle, User, Mail, Phone, Eye, EyeOff, 
  Linkedin, GraduationCap, Briefcase, Users, 
  FileEdit, Trash2, AlertTriangle, Search, 
  ChevronDown, MoreHorizontal
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Enums and types
type Role = 
  "CEO" | "CFO" | "COO" | "CTO" | "Director" | 
  "Manager" | "Supervisor" | "Chairman" | "VP" | "Other";

type Department = 
  "Executive" | "Finance" | "Operations" | "Technology" | 
  "Sales" | "Marketing" | "HR" | "Legal" | "Engineering" | "Other";

interface PersonnelMember {
  id: string;
  name: string;
  role: Role;
  department: Department;
  profileImage?: string;
  email: string;
  phone?: string;
  showContactInfo: boolean;  // Controls privacy
  qualifications: string[];
  experience: string;
  linkedinUrl?: string;
  bio?: string;
}

export default function PersonnelPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  
  // Sample personnel data
  const [personnel, setPersonnel] = useState<PersonnelMember[]>([
    {
      id: "1",
      name: "Alex Johnson",
      role: "CEO",
      department: "Executive",
      profileImage: "/placeholder-avatar.jpg",
      email: "alex.johnson@company.com",
      phone: "+1 (555) 123-4567",
      showContactInfo: true,
      qualifications: ["MBA, Harvard Business School", "B.Sc. Business Administration"],
      experience: "20+ years in technology and business leadership",
      linkedinUrl: "https://linkedin.com/in/alexjohnson",
      bio: "Alex leads our company with a focus on innovation and sustainable growth. Previously founded two successful startups in the enterprise software space."
    },
    {
      id: "2",
      name: "Samantha Lee",
      role: "CFO",
      department: "Finance",
      profileImage: "/placeholder-avatar.jpg",
      email: "samantha.lee@company.com",
      phone: "+1 (555) 234-5678",
      showContactInfo: false,
      qualifications: ["CPA", "M.Sc. Accounting & Finance", "B.Sc. Economics"],
      experience: "15+ years in financial management and strategic planning",
      linkedinUrl: "https://linkedin.com/in/samanthalee",
      bio: "Samantha oversees all financial operations and strategic planning. Previously worked at Big4 accounting firms and led financial operations for Fortune 500 companies."
    },
    {
      id: "3",
      name: "Marcus Williams",
      role: "CTO",
      department: "Technology",
      profileImage: "/placeholder-avatar.jpg",
      email: "marcus.williams@company.com",
      phone: "+1 (555) 345-6789",
      showContactInfo: true,
      qualifications: ["Ph.D. Computer Science", "M.Sc. Artificial Intelligence"],
      experience: "18+ years in software development and technical leadership",
      linkedinUrl: "https://linkedin.com/in/marcuswilliams",
      bio: "Marcus leads our technical strategy and innovation initiatives. Previously served as CTO for leading tech companies and published numerous papers on AI and distributed systems."
    },
    {
      id: "4",
      name: "Priya Patel",
      role: "Director",
      department: "Operations",
      profileImage: "/placeholder-avatar.jpg",
      email: "priya.patel@company.com",
      phone: "+1 (555) 456-7890",
      showContactInfo: false,
      qualifications: ["MBA, Operations Management", "Six Sigma Black Belt"],
      experience: "12+ years in operations and supply chain management",
      linkedinUrl: "https://linkedin.com/in/priyapatel",
      bio: "Priya oversees all operational aspects of our business, ensuring efficiency and excellence in delivery."
    },
    {
      id: "5",
      name: "David Chen",
      role: "Manager",
      department: "Sales",
      profileImage: "/placeholder-avatar.jpg",
      email: "david.chen@company.com",
      phone: "+1 (555) 567-8901",
      showContactInfo: true,
      qualifications: ["B.A. Business & Marketing"],
      experience: "10+ years in sales leadership and client relationship management",
      linkedinUrl: "https://linkedin.com/in/davidchen",
      bio: "David leads our global sales initiatives, building strong client relationships and driving revenue growth."
    }
  ]);
  
  // Action handlers
  const toggleContactVisibility = (id: string) => {
    setPersonnel(personnel =>
      personnel.map(person =>
        person.id === id ? { ...person, showContactInfo: !person.showContactInfo } : person
      )
    );
    
    toast({
      title: "Visibility updated",
      description: "Contact information visibility has been updated.",
    });
  };
  
  const handleDelete = () => {
    if (memberToDelete) {
      setPersonnel(personnel =>
        personnel.filter(person => person.id !== memberToDelete)
      );
      
      toast({
        title: "Personnel removed",
        description: "Team member has been removed successfully.",
      });
      
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };
  
  const confirmDelete = (id: string) => {
    setMemberToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleAddNew = () => {
    toast({
      title: "Feature in development",
      description: "Adding new team members will be available soon.",
    });
  };
  
  const handleEdit = (id: string) => {
    toast({
      title: "Feature in development",
      description: "Editing team members will be available soon.",
    });
  };
  
  // Filter personnel based on search query
  const filteredPersonnel = personnel.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.qualifications.some(q => q.toLowerCase().includes(searchQuery.toLowerCase())) ||
    person.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (person.bio && person.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Get color for role badge
  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case "CEO":
      case "Chairman":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200";
      case "CFO":
      case "COO":
      case "CTO":
      case "VP":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
      case "Director":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200";
      case "Manager":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
      case "Supervisor":
        return "bg-sky-100 text-sky-800 hover:bg-sky-200 border-sky-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
    }
  };
  
  // Get color for department badge
  const getDepartmentBadgeColor = (department: Department) => {
    switch (department) {
      case "Executive":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Finance":
        return "bg-green-50 text-green-700 border-green-200";
      case "Operations":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Technology":
      case "Engineering":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Sales":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Marketing":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "HR":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Legal":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-10">
      <div className="container px-6 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Key Personnel</h1>
            <p className="text-gray-500 text-sm">Showcase your company's leadership and management team</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all text-xs" onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-3.5 w-3.5" />
              Add Team Member
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-800 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Privacy Controls Available</p>
              <p className="mt-1">You can control the visibility of contact information for each team member. This allows you to showcase your team while protecting their privacy.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <Input
              placeholder="Search personnel by name, role, department..."
              className="pl-9 h-9 text-xs bg-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs h-9 border-gray-300 shadow-sm">
                <ChevronDown className="h-3.5 w-3.5 mr-2" />
                Filter by Department
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={() => setSearchQuery("")}>All Departments</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Executive")}>Executive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Finance")}>Finance</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Operations")}>Operations</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Technology")}>Technology</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Sales")}>Sales</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Marketing")}>Marketing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-6">
          {filteredPersonnel.length > 0 ? (
            filteredPersonnel.map((person) => (
              <Card key={person.id} className="overflow-hidden border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-white p-6 md:p-5 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0 sm:w-20 sm:h-20 w-16 h-16 relative rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                      {person.profileImage ? (
                        <Image
                          src={person.profileImage}
                          alt={person.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{person.name}</h2>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getRoleBadgeColor(person.role)}>
                            {person.role}
                          </Badge>
                          <Badge variant="outline" className={getDepartmentBadgeColor(person.department)}>
                            {person.department}
                          </Badge>
                        </div>
                        {person.bio && <p className="text-sm text-gray-600 md:max-w-2xl line-clamp-2">{person.bio}</p>}
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem onClick={() => handleEdit(person.id)}>
                              <FileEdit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmDelete(person.id)} className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {person.linkedinUrl && (
                          <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                            <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-3.5 w-3.5 mr-1.5" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 md:p-5 pt-4 md:pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                        <GraduationCap className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                        Qualifications
                      </h3>
                      <ul className="space-y-1 text-sm ml-5 list-disc">
                        {person.qualifications.map((qualification, index) => (
                          <li key={index}>{qualification}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                        <Briefcase className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                        Experience
                      </h3>
                      <p className="text-sm">{person.experience}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => toggleContactVisibility(person.id)}
                      >
                        {person.showContactInfo ? (
                          <>
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            Public
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                            Private
                          </>
                        )}
                      </Button>
                    </div>
                    {person.showContactInfo ? (
                      <div className="rounded-md bg-gray-50 p-3 space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 text-gray-400 mr-2" />
                          <a href={`mailto:${person.email}`} className="text-blue-600 hover:underline">
                            {person.email}
                          </a>
                        </div>
                        {person.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 text-gray-400 mr-2" />
                            <a href={`tel:${person.phone}`} className="text-blue-600 hover:underline">
                              {person.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-md bg-gray-50 p-3 space-y-2 flex items-center justify-center">
                        <EyeOff className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Contact information is private</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-gray-200 bg-white shadow-sm p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Users className="h-8 w-8 text-gray-400" />
                <h3 className="font-medium">No Personnel Found</h3>
                <p className="text-sm text-gray-500">
                  {searchQuery ? "No team members match your search. Try different keywords." : "Add your key team members to showcase your company's leadership."}
                </p>
                <Button className="mt-4" onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add First Team Member
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this team member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 