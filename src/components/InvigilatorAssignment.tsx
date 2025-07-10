
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Save,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const InvigilatorAssignment = () => {
  const { planId } = useParams();
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [autoAssignAttempted, setAutoAssignAttempted] = useState(false);
  const [showInsufficientError, setShowInsufficientError] = useState(false);

  // Mock exam plan data
  const examPlan = {
    id: planId,
    name: 'Mid-term Mathematics Exam',
    date: '2024-01-15',
    time: '10:00 AM',
    program: 'B.Tech Year 2',
    sections: ['A', 'B', 'C'],
    students: 125,
    rooms: [
      { id: 1, name: 'Room 101', capacity: 30, students: 30 },
      { id: 2, name: 'Room 102', capacity: 35, students: 35 },
      { id: 3, name: 'Room 103', capacity: 30, students: 30 },
      { id: 4, name: 'Room 104', capacity: 30, students: 30 }
    ],
    requiredInvigilators: 8 // 2 per room
  };

  // Mock teachers data
  const availableTeachers = [
    { id: '1', name: 'Dr. Smith Johnson', department: 'Mathematics', experience: 5, available: true },
    { id: '2', name: 'Prof. Sarah Davis', department: 'Physics', experience: 8, available: true },
    { id: '3', name: 'Dr. Michael Brown', department: 'Chemistry', experience: 3, available: false },
    { id: '4', name: 'Prof. Emily Wilson', department: 'Mathematics', experience: 7, available: true },
    { id: '5', name: 'Dr. James Miller', department: 'Physics', experience: 4, available: true },
    { id: '6', name: 'Prof. Lisa Anderson', department: 'Computer Science', experience: 6, available: true },
    { id: '7', name: 'Dr. Robert Taylor', department: 'Mathematics', experience: 9, available: true },
    { id: '8', name: 'Prof. Maria Garcia', department: 'Chemistry', experience: 5, available: true },
    { id: '9', name: 'Dr. David Lee', department: 'Physics', experience: 2, available: true },
    { id: '10', name: 'Prof. Jennifer White', department: 'Computer Science', experience: 4, available: false }
  ];

  const handleTeacherSelect = (teacherId: string, checked: boolean) => {
    if (checked) {
      setSelectedTeachers([...selectedTeachers, teacherId]);
    } else {
      setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
    }
  };

  const handleAutoAssign = () => {
    const availableTeachersFiltered = availableTeachers.filter(t => t.available);
    
    if (availableTeachersFiltered.length < examPlan.requiredInvigilators) {
      setShowInsufficientError(true);
      return;
    }

    // Auto-assign based on experience and availability
    const sortedTeachers = availableTeachersFiltered
      .sort((a, b) => b.experience - a.experience)
      .slice(0, examPlan.requiredInvigilators);
    
    setSelectedTeachers(sortedTeachers.map(t => t.id));
    setAutoAssignAttempted(true);
    setShowInsufficientError(false);
  };

  const handleSave = () => {
    console.log('Saving invigilator assignment:', {
      examPlanId: planId,
      selectedTeachers: selectedTeachers,
      timestamp: new Date().toISOString()
    });
    // Here you would typically save to your backend
  };

  const validateAssignment = () => {
    return selectedTeachers.length >= examPlan.requiredInvigilators;
  };

  const generateTable = () => {
    const selectedTeacherObjects = availableTeachers.filter(t => 
      selectedTeachers.includes(t.id)
    );

    return selectedTeacherObjects.map((teacher, index) => ({
      teacher: teacher.name,
      room: examPlan.rooms[Math.floor(index / 2)]?.name || 'TBD',
      role: index % 2 === 0 ? 'Primary' : 'Secondary',
      timeSlot: examPlan.time
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Link to="/draft-plans">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Drafts
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invigilator Assignment</h1>
                <p className="text-gray-600 mt-1">Assign invigilators for {examPlan.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Assignment Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Exam Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Exam Name</label>
                    <p className="text-gray-900">{examPlan.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date & Time</label>
                    <p className="text-gray-900">{examPlan.date} at {examPlan.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Program</label>
                    <p className="text-gray-900">{examPlan.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Students</label>
                    <p className="text-gray-900">{examPlan.students}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Room Allocation</label>
                  <div className="grid grid-cols-2 gap-2">
                    {examPlan.rooms.map(room => (
                      <Badge key={room.id} variant="outline" className="justify-center">
                        {room.name}: {room.students} students
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Teachers</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleAutoAssign}
                      className="text-red-800 border-red-800 hover:bg-red-50"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Auto Assign
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Required: {examPlan.requiredInvigilators} teachers | Selected: {selectedTeachers.length}
                </p>
              </CardHeader>
              <CardContent>
                {showInsufficientError && (
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Insufficient teachers available. Only {availableTeachers.filter(t => t.available).length} teachers are available, but {examPlan.requiredInvigilators} are required.
                    </AlertDescription>
                  </Alert>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Teacher Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableTeachers.map((teacher) => (
                      <TableRow key={teacher.id} className={!teacher.available ? 'opacity-50' : ''}>
                        <TableCell>
                          <Checkbox
                            checked={selectedTeachers.includes(teacher.id)}
                            onCheckedChange={(checked) => handleTeacherSelect(teacher.id, checked as boolean)}
                            disabled={!teacher.available}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>{teacher.experience} years</TableCell>
                        <TableCell>
                          <Badge className={teacher.available ? 'bg-green-600' : 'bg-red-600'}>
                            {teacher.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Assignment Validation */}
            {selectedTeachers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {validateAssignment() ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    Assignment Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Teachers Required:</span>
                      <span className="font-medium">{examPlan.requiredInvigilators}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Teachers Selected:</span>
                      <span className={`font-medium ${selectedTeachers.length >= examPlan.requiredInvigilators ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedTeachers.length}
                      </span>
                    </div>
                    {!validateAssignment() && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          Please select at least {examPlan.requiredInvigilators} teachers to proceed.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Rooms:</span>
                    <span className="font-medium">{examPlan.rooms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Required Invigilators:</span>
                    <span className="font-medium">{examPlan.requiredInvigilators}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Selected Teachers:</span>
                    <span className={`font-medium ${validateAssignment() ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedTeachers.length}
                    </span>
                  </div>
                </div>

                <Separator />

                {selectedTeachers.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Teachers:</h4>
                    <div className="space-y-1">
                      {availableTeachers
                        .filter(t => selectedTeachers.includes(t.id))
                        .map(teacher => (
                          <div key={teacher.id} className="text-sm text-gray-600">
                            {teacher.name}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Assignment Table */}
            {validateAssignment() && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generateTable().map((assignment, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border">
                        <div className="text-sm">
                          <div className="font-medium">{assignment.teacher}</div>
                          <div className="text-gray-600">{assignment.room} - {assignment.role}</div>
                          <div className="text-gray-500">{assignment.timeSlot}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button 
                  className="w-full bg-red-800 hover:bg-red-900"
                  onClick={handleSave}
                  disabled={!validateAssignment()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Assignment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={!validateAssignment()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvigilatorAssignment;
