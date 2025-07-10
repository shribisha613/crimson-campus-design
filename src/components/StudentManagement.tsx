
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Upload, Download, Search, ArrowRight, ArrowLeft, UserMinus } from 'lucide-react';

interface StudentManagementProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Sharma', rollNo: 'CS001', section: 'A', eligible: true },
    { id: 2, name: 'Priya Patel', rollNo: 'CS002', section: 'A', eligible: true },
    { id: 3, name: 'Amit Kumar', rollNo: 'CS003', section: 'B', eligible: false },
    { id: 4, name: 'Sneha Gupta', rollNo: 'CS004', section: 'B', eligible: true },
    { id: 5, name: 'Vikram Singh', rollNo: 'CS005', section: 'C', eligible: true },
    { id: 6, name: 'Pooja Verma', rollNo: 'CS006', section: 'C', eligible: false },
    { id: 7, name: 'Arjun Reddy', rollNo: 'CS007', section: 'A', eligible: true },
    { id: 8, name: 'Kavya Nair', rollNo: 'CS008', section: 'B', eligible: true }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eligibleStudents = students.filter(s => s.eligible);
  const ineligibleStudents = students.filter(s => !s.eligible);

  const handleToggleEligibility = (studentId: number) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, eligible: !student.eligible }
        : student
    ));
  };

  const handleContinue = () => {
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Eligible Students</p>
                    <p className="text-2xl font-bold text-green-900">{eligibleStudents.length}</p>
                  </div>
                  <Badge className="bg-green-600">Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700">Ineligible Students</p>
                    <p className="text-2xl font-bold text-red-900">{ineligibleStudents.length}</p>
                  </div>
                  <Badge className="bg-red-600">Blocked</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Total Students</p>
                    <p className="text-2xl font-bold text-blue-900">{students.length}</p>
                  </div>
                  <Badge className="bg-blue-600">Total</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search students by name or roll number..."
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
                        <Badge variant="outline">Section {student.section}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={student.eligible ? 'bg-green-600' : 'bg-red-600'}
                        >
                          {student.eligible ? 'Eligible' : 'Ineligible'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleEligibility(student.id)}
                        >
                          {student.eligible ? (
                            <>
                              <UserMinus className="w-4 h-4 mr-1" />
                              Remove
                            </>
                          ) : (
                            <>
                              <Users className="w-4 h-4 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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
