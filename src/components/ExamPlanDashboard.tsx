
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, AlertCircle, Users, Calendar, MapPin, FileText } from 'lucide-react';
import CreateExamForm from './CreateExamForm';
import ProgramYearSelector from './ProgramYearSelector';
import SectionSelector from './SectionSelector';
import RoomSelector from './RoomSelector';
import StudentManagement from './StudentManagement';

const ExamPlanDashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [examData, setExamData] = useState({
    name: '',
    date: '',
    time: '',
    program: '',
    year: '',
    sections: [],
    rooms: [],
    students: []
  });

  const steps = [
    { id: 0, title: 'Create Exam Plan', icon: FileText, component: CreateExamForm },
    { id: 1, title: 'Select Program & Year', icon: Calendar, component: ProgramYearSelector },
    { id: 2, title: 'Select Sections', icon: Users, component: SectionSelector },
    { id: 3, title: 'Manage Students', icon: Users, component: StudentManagement },
    { id: 4, title: 'Select Rooms', icon: MapPin, component: RoomSelector },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepComponent = () => {
    const CurrentComponent = steps[currentStep].component;
    // Custom onNext for ProgramYearSelector
    if (CurrentComponent === ProgramYearSelector) {
      return (
        <ProgramYearSelector
          data={examData}
          onUpdate={setExamData}
          onNext={(newData: any) => {
            setExamData(newData);
            if (newData.examType === 'resit') {
              setCurrentStep(4); // Go to Room Selection
            } else {
              setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
            }
          }}
          onPrevious={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
        />
      );
    }
    return (
      <CurrentComponent
        data={examData}
        onUpdate={setExamData}
        onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
        onPrevious={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RTE Exam Management</h1>
              <p className="text-gray-600 mt-1">Create and manage examination plans</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            {renderStepComponent()}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Exam Name</label>
                  <p className="text-gray-900">{examData.name || 'Not set'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Date & Time</label>
                  <p className="text-gray-900">{examData.date && examData.time ? `${examData.date} at ${examData.time}` : 'Not set'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Program & Year</label>
                  <p className="text-gray-900">{examData.program && examData.year ? `${examData.program} - Year ${examData.year}` : 'Not selected'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Sections</label>
                  <p className="text-gray-900">{examData.sections.length} selected</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Students</label>
                  <p className="text-gray-900">{examData.students.length} registered</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Rooms</label>
                  <p className="text-gray-900">{examData.rooms.length} allocated</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPlanDashboard;
