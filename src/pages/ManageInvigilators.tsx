import React, { useState, useRef } from 'react';
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
  Filter,
  Edit,
  Trash2,
  UserCheck,
  Users,
  Download,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ManageInvigilators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('academic');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importedFiles, setImportedFiles] = useState<{ [key: string]: string[] }>({
    academic: [],
    'non-academic': []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const academicStaff = [
    { id: 1, name: 'Dr. Smith Johnson', department: 'Mathematics', experience: 5, status: 'Available' },
    { id: 2, name: 'Prof. Sarah Davis', department: 'Physics', experience: 8, status: 'Available' },
    { id: 3, name: 'Dr. Michael Brown', department: 'Chemistry', experience: 3, status: 'Unavailable' },
    { id: 4, name: 'Prof. Emily Wilson', department: 'Mathematics', experience: 7, status: 'Available' },
  ];

  const nonAcademicStaff = [
    { id: 5, name: 'John Administrator', department: 'Administration', experience: 2, status: 'Available' },
    { id: 6, name: 'Mary Clerk', department: 'Office', experience: 1, status: 'Available' },
    { id: 7, name: 'Robert Security', department: 'Security', experience: 4, status: 'Unavailable' },
  ];

  const getCurrentData = () => activeTab === 'academic' ? academicStaff : nonAcademicStaff;

  const filteredData = getCurrentData().filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileImport = (type: 'academic' | 'non-academic', file: File) => {
    const fileName = file.name;
    setImportedFiles(prev => {
      const existing = prev[type] || [];
      return {
        ...prev,
        [type]: existing.includes(fileName) ? existing : [...existing, fileName]
      };
    });
    toast({
      title: 'File Imported',
      description: `${file.name} added to ${type} staff.`,
    });
    setImportDialogOpen(false);
  };

  const triggerFileInput = (type: 'academic' | 'non-academic') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = (e: any) => handleFileImport(type, e.target.files[0]);
    input.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Invigilators</h1>
        <p className="text-gray-600 mt-1">Import and manage invigilator lists</p>
      </div>

      {/* Import Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Import Invigilators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
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
                  <p className="text-sm text-gray-600">Choose the type of staff you want to import:</p>
                  <div className="flex flex-col gap-3">
                    <Button onClick={() => triggerFileInput('academic')} className="bg-red-800 hover:bg-red-900 justify-start">
                      <Users className="w-4 h-4 mr-2" /> Academic Staff
                    </Button>
                    <Button onClick={() => triggerFileInput('non-academic')} variant="outline" className="justify-start">
                      <UserCheck className="w-4 h-4 mr-2" /> Non-Academic Staff
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-6">
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invigilators List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> Invigilators
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="academic">Academic Staff ({academicStaff.length})</TabsTrigger>
              <TabsTrigger value="non-academic">Non-Academic Staff ({nonAcademicStaff.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="academic">
              {importedFiles.academic.map((file, idx) => (
                <Badge key={idx} className="mb-2 mr-2">{file}</Badge>
              ))}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.experience} years</TableCell>
                      <TableCell>
                        <Badge className={staff.status === 'Available' ? 'bg-green-600' : 'bg-red-600'}>
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="non-academic">
              {importedFiles['non-academic'].map((file, idx) => (
                <Badge key={idx} className="mb-2 mr-2">{file}</Badge>
              ))}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.experience} years</TableCell>
                      <TableCell>
                        <Badge className={staff.status === 'Available' ? 'bg-green-600' : 'bg-red-600'}>
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
  );
};

export default ManageInvigilators;