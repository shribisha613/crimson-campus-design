
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Upload, Download, Search, ArrowRight, ArrowLeft, UserMinus } from 'lucide-react';

interface StudentManagementProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['BIT']);

  const courses = ['BIT', 'BBA', 'MBA', 'BSc', 'MSc'];

  const students = [
    { id: 1, name: 'Rahul Sharma', rollNo: 'BIT001', course: 'BIT', section: 'A', eligible: true },
    { id: 2, name: 'Priya Patel', rollNo: 'BBA002', course: 'BBA', section: 'A', eligible: true },
    { id: 3, name: 'Amit Kumar', rollNo: 'BIT003', course: 'BIT', section: 'B', eligible: false },
    { id: 4, name: 'Sneha Gupta', rollNo: 'MBA004', course: 'MBA', section: 'B', eligible: true },
    { id: 5, name: 'Vikram Singh', rollNo: 'BIT005', course: 'BIT', section: 'C', eligible: true },
    { id: 6, name: 'Pooja Verma', rollNo: 'BBA006', course: 'BBA', section: 'C', eligible: false },
  ];

  const getCurrentStudents = () => {
    return students.filter(student => 
      selectedCourses.length === 0 || selectedCourses.includes(student.course)
    );
  };

  const filteredStudents = getCurrentStudents().filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) 
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  const handleContinue = () => {
    const eligibleStudents = getCurrentStudents().filter(s => s.eligible);
    onUpdate({ 
      ...data, 
      students: eligibleStudents
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-800" />
              Student Management
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import Students
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
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
            </CardContent>
          </Card>

          {/* Student List */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Student List */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Section</TableHead>
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
                          <Badge variant="outline">{student.course}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Section {student.section}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={student.eligible ? 'bg-green-600' : 'bg-red-600'}>
                            {student.eligible ? 'Eligible' : 'Ineligible'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleContinue}
              className="bg-red-800 hover:bg-red-900"
            >
              Continue to Room Selection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
