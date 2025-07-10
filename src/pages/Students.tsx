
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Search, Upload, Download, Filter, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isResitStudents, setIsResitStudents] = useState(false);
  const { toast } = useToast();

  const courses = ['BIT', 'BBA', 'MBA', 'BSc', 'MSc'];

  const students = [
    { id: 1, name: 'Rahul Sharma', rollNo: 'CS001', program: 'B.Tech', year: '2', section: 'A', email: 'rahul.sharma@college.edu', phone: '+91 9876543210', eligible: true },
    { id: 2, name: 'Priya Patel', rollNo: 'CS002', program: 'B.Tech', year: '2', section: 'A', email: 'priya.patel@college.edu', phone: '+91 9876543211', eligible: true },
    { id: 3, name: 'Amit Kumar', rollNo: 'CS003', program: 'B.Tech', year: '2', section: 'B', email: 'amit.kumar@college.edu', phone: '+91 9876543212', eligible: false },
    { id: 4, name: 'Sneha Gupta', rollNo: 'CS004', program: 'B.Sc', year: '3', section: 'A', email: 'sneha.gupta@college.edu', phone: '+91 9876543213', eligible: true },
    { id: 5, name: 'Vikram Singh', rollNo: 'CS005', program: 'M.Tech', year: '1', section: 'A', email: 'vikram.singh@college.edu', phone: '+91 9876543214', eligible: true }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eligibleCount = students.filter(s => s.eligible).length;
  const ineligibleCount = students.filter(s => !s.eligible).length;

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="text-gray-600 mt-1">Manage student records and eligibility</p>
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
                      <label className="text-sm font-medium text-gray-700 mb-3 block">Select Courses:</label>
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
              <Button className="bg-red-800 hover:bg-red-900">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Eligible</p>
                  <p className="text-3xl font-bold text-green-900">{eligibleCount}</p>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700">Ineligible</p>
                  <p className="text-3xl font-bold text-red-900">{ineligibleCount}</p>
                </div>
                <Badge className="bg-red-600">Blocked</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Programs</p>
                  <p className="text-3xl font-bold text-blue-900">3</p>
                </div>
                <Badge className="bg-blue-600">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Section</TableHead>
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
                      <Badge variant="outline">
                        {student.program} Year {student.year}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Section {student.section}</Badge>
                    </TableCell>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Students;
