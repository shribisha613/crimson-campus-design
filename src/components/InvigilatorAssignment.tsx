
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
import { Link, useParams, useNavigate } from 'react-router-dom';

const InvigilatorAssignment = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [autoAssignAttempted, setAutoAssignAttempted] = useState(false);
  const [showInsufficientError, setShowInsufficientError] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);

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
    requiredInvigilators: 8
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

    const sortedTeachers = availableTeachersFiltered
      .sort((a, b) => b.experience - a.experience)
      .slice(0, examPlan.requiredInvigilators);
    
    setSelectedTeachers(sortedTeachers.map(t => t.id));
    setAutoAssignAttempted(true);
    setShowInsufficientError(false);
  };

  const handleSaveAssignment = () => {
    console.log('Saving assignment:', {
      examPlanId: planId,
      selectedTeachers: selectedTeachers,
      timestamp: new Date().toISOString()
    });
    
    toast({
      title: "Assignment Saved",
      description: "Invigilator assignment has been saved as draft.",
    });
  };

  const handleFinalizeAssignment = () => {
    console.log('Finalizing assignment:', {
      examPlanId: planId,
      selectedTeachers: selectedTeachers,
      timestamp: new Date().toISOString()
    });
    
    setIsAssigned(true);
    
    toast({
      title: "Assignment Finalized",
      description: "Invigilator assignment has been finalized successfully.",
    });

    // Navigate back to draft plans after a short delay
    setTimeout(() => {
      navigate('/draft-plans');
    }, 2000);
  };

  const validateAssignment = () => {
    return selectedTeachers.length >= examPlan.requiredInvigilators;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/draft-plans">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Drafts
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Invigilator Assignment</h1>
        <p className="text-gray-600 mt-1">Assign invigilators for {examPlan.name}</p>
      </div>

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
                    disabled={isAssigned}
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
                          disabled={!teacher.available || isAssigned}
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

          {/* Assignment Status */}
          {isAssigned && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Assignment has been finalized! Redirecting to draft plans...
              </AlertDescription>
            </Alert>
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

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveAssignment}
                disabled={!validateAssignment() || isAssigned}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Assignment
              </Button>
              <Button 
                className="w-full bg-red-800 hover:bg-red-900"
                onClick={handleFinalizeAssignment}
                disabled={!validateAssignment() || isAssigned}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Finalize Assignment
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
  );
};

export default InvigilatorAssignment;
