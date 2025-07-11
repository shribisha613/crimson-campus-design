
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Search, Upload, Download, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isResitStudents, setIsResitStudents] = useState(false);
  const { toast } = useToast();

  const courses = ['BIT', 'BBA'];

  // Sample imported Excel data
  const importedStudentsData = {
    BIT: {
      regular: [
        { id: 1, name: 'Rahul Sharma', rollNo: 'BIT001', email: 'rahul.sharma@college.edu', phone: '+91 9876543210', eligible: true, importedFrom: 'BIT_Regular_2024.xlsx' },
        { id: 2, name: 'Amit Kumar', rollNo: 'BIT003', email: 'amit.kumar@college.edu', phone: '+91 9876543212', eligible: false, importedFrom: 'BIT_Regular_2024.xlsx' },
        { id: 3, name: 'Neha Singh', rollNo: 'BIT007', email: 'neha.singh@college.edu', phone: '+91 9876543216', eligible: true, importedFrom: 'BIT_Regular_2024.xlsx' },
      ],
      resit: [
        { id: 4, name: 'Vikram Singh', rollNo: 'BIT005', email: 'vikram.singh@college.edu', phone: '+91 9876543214', eligible: true, importedFrom: 'BIT_Resit_2024.xlsx' },
        { id: 5, name: 'Arjun Patel', rollNo: 'BIT009', email: 'arjun.patel@college.edu', phone: '+91 9876543218', eligible: false, importedFrom: 'BIT_Resit_2024.xlsx' },
      ]
    },
    BBA: {
      regular: [
        { id: 6, name: 'Priya Patel', rollNo: 'BBA002', email: 'priya.patel@college.edu', phone: '+91 9876543211', eligible: true, importedFrom: 'BBA_Regular_2024.xlsx' },
        { id: 7, name: 'Sneha Gupta', rollNo: 'BBA004', email: 'sneha.gupta@college.edu', phone: '+91 9876543213', eligible: true, importedFrom: 'BBA_Regular_2024.xlsx' },
        { id: 8, name: 'Rajesh Kumar', rollNo: 'BBA008', email: 'rajesh.kumar@college.edu', phone: '+91 9876543217', eligible: false, importedFrom: 'BBA_Regular_2024.xlsx' },
      ],
      resit: [
        { id: 9, name: 'Pooja Verma', rollNo: 'BBA006', email: 'pooja.verma@college.edu', phone: '+91 9876543215', eligible: false, importedFrom: 'BBA_Resit_2024.xlsx' },
      ]
    }
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) 
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleImport = () => {
    console.log('Importing students:', {
      courses: selectedCourses,
      isResit: isResitStudents
    });
    
    toast({
      title: "Import Started",
      description: `Student import has been initiated for ${selectedCourses.join(', ')} ${isResitStudents ? '(Resit Students)' : '(Regular Students)'}.`,
    });
    
    setImportDialogOpen(false);
    setSelectedCourses([]);
    setIsResitStudents(false);
  };

  const renderStudentTable = (students: any[], program: string, type: string) => {
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fileName = filteredStudents.length > 0 ? filteredStudents[0].importedFrom : `${program}_${type}_2024.xlsx`;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Excel File: {fileName}
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{student.email}</span>
                    <span className="text-gray-500">{student.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={student.eligible ? 'bg-green-600' : 'bg-red-600'}>
                    {student.eligible ? 'Eligible' : 'Ineligible'}
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="text-gray-600 mt-1">Manage imported student records</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Students
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Import Students</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    {/* Course Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">Select Programs:</label>
                      <div className="grid grid-cols-2 gap-3">
                        {courses.map(course => (
                          <div key={course} className="flex items-center space-x-2">
                            <Checkbox
                              id={course}
                              checked={selectedCourses.includes(course)}
                              onCheckedChange={() => handleCourseToggle(course)}
                            />
                            <label htmlFor={course} className="text-sm font-medium">
                              {course}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Student Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">Student Type:</label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="resit"
                          checked={isResitStudents}
                          onCheckedChange={(checked) => setIsResitStudents(checked as boolean)}
                        />
                        <label htmlFor="resit" className="text-sm font-medium">
                          Resit Students
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Check this if importing resit/supplementary exam students
                      </p>
                    </div>

                    <Button 
                      onClick={handleImport}
                      disabled={selectedCourses.length === 0}
                      className="w-full bg-red-800 hover:bg-red-900"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Students
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Program Compartments */}
        <div className="space-y-6">
          {courses.map((program) => (
            <Card key={program}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {program}
                  </Badge>
                  Program Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="regular" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="regular">Regular Students</TabsTrigger>
                    <TabsTrigger value="resit">Resit Students</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="regular" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        {renderStudentTable(importedStudentsData[program as keyof typeof importedStudentsData].regular, program, 'regular')}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="resit" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        {renderStudentTable(importedStudentsData[program as keyof typeof importedStudentsData].resit, program, 'resit')}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
