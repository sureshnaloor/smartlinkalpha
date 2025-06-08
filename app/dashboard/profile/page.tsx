"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, Building, Globe, MapPin, Phone, Mail, Users, Briefcase, Check, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const basicInfoSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyWebsite: z.string().url({
    message: "Please enter a valid URL.",
  }),
  companyDescription: z.string().min(10, {
    message: "Company description must be at least 10 characters.",
  }),
  yearEstablished: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (e.g., 2010).",
  }),
  numberOfEmployees: z.string({
    required_error: "Please select the number of employees.",
  }),
  businessType: z.string({
    required_error: "Please select a business type.",
  }),
})

const contactInfoSchema = z.object({
  addressLine1: z.string().min(1, {
    message: "Address line 1 is required.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  state: z.string().min(1, {
    message: "State/Province is required.",
  }),
  postalCode: z.string().min(1, {
    message: "Postal code is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  phone: z.string().min(5, {
    message: "Phone number is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

// Helper function to calculate profile completion percentage
function calculateCompletionPercentage(basicInfo: any, contactInfo: any) {
  // Define all fields that contribute to completion
  const basicInfoFields = [
    'companyName',
    'companyWebsite',
    'companyDescription',
    'yearEstablished',
    'numberOfEmployees',
    'businessType'
  ];
  
  const contactInfoFields = [
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
    'phone',
    'email',
  ];
  
  // We don't count addressLine2 as it's optional
  const totalFields = basicInfoFields.length + contactInfoFields.length;
  let completedFields = 0;
  
  // Count completed fields in basicInfo
  basicInfoFields.forEach(field => {
    if (basicInfo[field] && basicInfo[field].trim && basicInfo[field].trim() !== '') {
      completedFields++;
    } else if (basicInfo[field] && !basicInfo[field].trim) {
      // For non-string fields like selections
      completedFields++;
    }
  });
  
  // Count completed fields in contactInfo
  contactInfoFields.forEach(field => {
    if (contactInfo[field] && contactInfo[field].trim && contactInfo[field].trim() !== '') {
      completedFields++;
    } else if (contactInfo[field] && !contactInfo[field].trim) {
      // For non-string fields
      completedFields++;
    }
  });
  
  // Calculate percentage
  const percentage = Math.round((completedFields / totalFields) * 100);
  return percentage;
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic-info")
  const [isLoading, setIsLoading] = useState(false)
  const [completionPercent, setCompletionPercent] = useState(0)
  
  // Empty initial states instead of default values
  const [savedBasicInfo, setSavedBasicInfo] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    yearEstablished: "",
    numberOfEmployees: "",
    businessType: "",
  })
  
  const [savedContactInfo, setSavedContactInfo] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  })

  // Calculate initial completion percentage when component mounts
  useEffect(() => {
    const percentage = calculateCompletionPercentage(savedBasicInfo, savedContactInfo);
    setCompletionPercent(percentage);
  }, [savedBasicInfo, savedContactInfo]);

  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: savedBasicInfo,
  })

  const contactInfoForm = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: savedContactInfo,
  })

  function onBasicInfoSubmit(values: z.infer<typeof basicInfoSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Save the updated values
      setSavedBasicInfo(values);
      
      // Recalculate completion percentage
      const percentage = calculateCompletionPercentage(values, savedContactInfo);
      setCompletionPercent(percentage);
      
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
        variant: "default",
      })
      
      // If profile is now complete
      if (percentage === 100) {
        toast({
          title: "Profile Complete!",
          description: "Your company profile is now 100% complete.", 
          variant: "default",
        })
      }
    }, 1500)
  }

  function onContactInfoSubmit(values: z.infer<typeof contactInfoSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Save the updated values - ensure addressLine2 is a string
      setSavedContactInfo({
        ...values,
        addressLine2: values.addressLine2 || ""  // Ensure addressLine2 is a string, not undefined
      });
      
      // Recalculate completion percentage
      const percentage = calculateCompletionPercentage(savedBasicInfo, values);
      setCompletionPercent(percentage);
      
      toast({
        title: "Contact information updated",
        description: "Your company contact details have been saved successfully.",
        variant: "default",
      })
      
      // If profile is now complete
      if (percentage === 100) {
        toast({
          title: "Profile Complete!",
          description: "Your company profile is now 100% complete.",
          variant: "default",
        })
      }
    }, 1500)
  }

  // Get the profile completion status text
  const getCompletionStatus = () => {
    if (completionPercent === 100) return "Complete";
    if (completionPercent >= 75) return "Almost Complete";
    if (completionPercent >= 50) return "In Progress";
    if (completionPercent >= 25) return "Just Started";
    return "Not Started";
  }

  // Get the appropriate badge color class based on completion
  const getCompletionBadgeClass = () => {
    if (completionPercent === 100) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30";
    }
    if (completionPercent >= 75) {
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30";
    }
    if (completionPercent >= 50) {
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30";
    }
    if (completionPercent >= 25) {
      return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30";
    }
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30";
  }

  return (
    <div className="container px-3 bg-stone-50 max-w-5xl py-8 space-y-8">
      <div className="relative flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold tracking-tight">Company Profile</h1>
            <Badge variant="outline" className={getCompletionBadgeClass()}>
              {getCompletionStatus()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Complete your profile to improve your vendor visibility</p>
        </div>
        
        <div className="flex flex-col items-start space-y-2 md:items-end">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Profile completion</span>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{completionPercent}%</span>
          </div>
          <div className="w-full md:w-64">
            <Progress value={completionPercent} className="h-2 bg-gray-100 dark:bg-gray-800">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" style={{ width: `${completionPercent}%` }} />
            </Progress>
          </div>
        </div>
      </div>

      <Tabs defaultValue="basic-info" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
          <TabsTrigger value="basic-info" className="text-sm">Basic Information</TabsTrigger>
          <TabsTrigger value="contact-info" className="text-sm">Contact Information</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-900/70 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
                  <CardDescription className="text-sm mt-1.5">
                    General information about your company
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                  Required
                </Badge>
              </div>
            </CardHeader>
            <Form {...basicInfoForm}>
              <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)}>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={basicInfoForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Company Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input 
                                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                                placeholder="Acme Inc." 
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
                      control={basicInfoForm.control}
                      name="companyWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Company Website</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input 
                                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                                placeholder="https://acme.example.com" 
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
                    control={basicInfoForm.control}
                    name="companyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Company Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[120px] bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 resize-none" 
                            placeholder="A brief description of your company, products, and services..." 
                            {...field} 
                            disabled={isLoading} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Provide a brief description of your company, products, and services.
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={basicInfoForm.control}
                      name="yearEstablished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Year Established</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="2010" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={basicInfoForm.control}
                      name="numberOfEmployees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Number of Employees</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                            <FormControl>
                              <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <SelectTrigger className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                                  <SelectValue placeholder="Select employee range" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10</SelectItem>
                              <SelectItem value="11-50">11-50</SelectItem>
                              <SelectItem value="50-100">50-100</SelectItem>
                              <SelectItem value="101-250">101-250</SelectItem>
                              <SelectItem value="251-500">251-500</SelectItem>
                              <SelectItem value="501-1000">501-1000</SelectItem>
                              <SelectItem value="1000+">1000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={basicInfoForm.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Business Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <SelectTrigger className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="manufacturer">Manufacturer</SelectItem>
                              <SelectItem value="distributor">Distributor</SelectItem>
                              <SelectItem value="service_provider">Service Provider</SelectItem>
                              <SelectItem value="consultant">Consultant</SelectItem>
                              <SelectItem value="contractor">Contractor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4 px-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setActiveTab("contact-info")}
                    className="text-sm h-9 px-4"
                  >
                    Next: Contact Information
                  </Button>
                  <Button 
                    type="submit" 
                    className="text-sm h-9 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-600 border-0" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="contact-info" className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-900/70 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
                  <CardDescription className="text-sm mt-1.5">
                    Provide contact details for your company
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                  Required
                </Badge>
              </div>
            </CardHeader>
            <Form {...contactInfoForm}>
              <form onSubmit={contactInfoForm.handleSubmit(onContactInfoSubmit)}>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-6">
                    <FormField
                      control={contactInfoForm.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Address Line 1</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input 
                                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                                placeholder="123 Main Street" 
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
                      control={contactInfoForm.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="Suite 100" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactInfoForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">City</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="San Francisco" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactInfoForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">State/Province</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="CA" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactInfoForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Postal Code</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="94105" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactInfoForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Country</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                              placeholder="United States" 
                              {...field} 
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={contactInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input 
                                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                                placeholder="+1 (555) 123-4567" 
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
                      control={contactInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <Input 
                                className="pl-10 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" 
                                placeholder="contact@yourcompany.com" 
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
                </CardContent>
                <CardFooter className="flex justify-between py-4 px-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setActiveTab("basic-info")}
                    className="text-sm h-9 px-4"
                  >
                    Back: Basic Information
                  </Button>
                  <Button 
                    type="submit" 
                    className="text-sm h-9 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-600 border-0" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 rounded-md mt-6">
        <div className="flex items-start gap-4">
          <div className="mt-0.5">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Complete your profile</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">A complete profile helps you stand out to potential clients and increases your chances of receiving contract opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
