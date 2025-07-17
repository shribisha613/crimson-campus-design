import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Upload,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ManageInvigilators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("academic");
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importedFiles, setImportedFiles] = useState<{
    [key: string]: string[];
  }>({
    academic: [],
    "non-academic": [],
  });

  const { toast } = useToast();

  const [academicStaff, setAcademicStaff] = useState([
    { id: 1, name: "Dr. Smith Johnson", email: "Mathematics" },
    { id: 2, name: "Prof. Sarah Davis", email: "Physics" },
    { id: 3, name: "Dr. Michael Brown", email: "Chemistry" },
    { id: 4, name: "Prof. Emily Wilson", email: "Mathematics" },
  ]);

  const [nonAcademicStaff, setNonAcademicStaff] = useState([
    { id: 5, name: "John Administrator", email: "Administration" },
    { id: 6, name: "Mary Clerk", email: "Office" },
    { id: 7, name: "Robert Security", email: "Security" },
  ]);

  const getCurrentData = () =>
    activeTab === "academic" ? academicStaff : nonAcademicStaff;

  const filteredData = getCurrentData().filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileImport = (type: "academic" | "non-academic", file: File) => {
    const fileName = file.name;
    setImportedFiles((prev) => {
      const existing = prev[type] || [];
      return {
        ...prev,
        [type]: existing.includes(fileName)
          ? existing
          : [...existing, fileName],
      };
    });
    toast({
      title: "File Imported",
      description: `${file.name} added to ${type} staff.`,
    });
    setImportDialogOpen(false);
  };

  const triggerFileInput = (type: "academic" | "non-academic") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls";
    input.onchange = (e: any) => handleFileImport(type, e.target.files[0]);
    input.click();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Invigilators
          </h1>
          <p className="text-gray-600 mt-1">
            Import and manage invigilator lists
          </p>
        </div>

        {/* Search and Import */}
        <Card className="mb-6 bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search invigilators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-800 hover:bg-red-900">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Invigilators
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Staff Type</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm text-gray-600">
                      Choose the type of staff you want to import:
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={() => triggerFileInput("academic")}
                        className="bg-red-800 hover:bg-red-900 justify-start"
                      >
                        <Users className="w-4 h-4 mr-2" /> Academic Staff
                      </Button>
                      <Button
                        onClick={() => triggerFileInput("non-academic")}
                        variant="outline"
                        className="justify-start"
                      >
                        <UserCheck className="w-4 h-4 mr-2" /> Non-Academic Staff
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="bg-white border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> Invigilators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="academic">
                  Academic Staff ({academicStaff.length})
                </TabsTrigger>
                <TabsTrigger value="non-academic">
                  Non-Academic Staff ({nonAcademicStaff.length})
                </TabsTrigger>
              </TabsList>

              {/* Academic Tab */}
              <TabsContent value="academic">
                <div className="mb-4">
                  {importedFiles.academic.map((file, idx) => (
                    <Badge key={idx} className="mb-2 mr-2">
                      {file}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Academic Staff List</h2>
                  {academicStaff.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to remove all academic staff?"
                          )
                        ) {
                          setAcademicStaff([]);
                          toast({
                            title: "All academic staff removed",
                            description: "The list has been cleared.",
                          });
                        }
                      }}
                    >
                      Remove All
                    </Button>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Non-Academic Tab */}
              <TabsContent value="non-academic">
                <div className="mb-4">
                  {importedFiles["non-academic"].map((file, idx) => (
                    <Badge key={idx} className="mb-2 mr-2">
                      {file}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Non-Academic Staff List
                  </h2>
                  {nonAcademicStaff.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to remove all non-academic staff?"
                          )
                        ) {
                          setNonAcademicStaff([]);
                          toast({
                            title: "All non-academic staff removed",
                            description: "The list has been cleared.",
                          });
                        }
                      }}
                    >
                      Remove All
                    </Button>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nonAcademicStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageInvigilators;