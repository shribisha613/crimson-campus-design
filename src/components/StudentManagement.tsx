
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Upload, ArrowRight, ArrowLeft, FileText, X } from 'lucide-react';

interface StudentManagementProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [retakeFile, setRetakeFile] = useState<File | null>(null);
  const [ineligibleFile, setIneligibleFile] = useState<File | null>(null);

  // Mock student count - in real app this would come from backend based on selected program/year/sections
  const currentStudentCount = data.sections ? 
    data.sections.reduce((total: number, sectionId: string) => {
      // Mock section student counts - in real app this would come from backend
      const sectionStudentCounts: { [key: string]: number } = {
        'C1': 45, 'C2': 42, 'C3': 38, 'C4': 40, 'C5': 35, 'C6': 33,
        'C7': 41, 'C8': 39, 'C9': 37, 'C10': 44, 'C11': 36, 'C12': 43
      };
      return total + (sectionStudentCounts[sectionId] || 0);
    }, 0) : 0;

  const handleRetakeFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRetakeFile(file);
    }
  };

  const handleIneligibleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIneligibleFile(file);
    }
  };

  const removeRetakeFile = () => {
    setRetakeFile(null);
  };

  const removeIneligibleFile = () => {
    setIneligibleFile(null);
  };

  const handleContinue = () => {
    onUpdate({ 
      ...data, 
      retakeFile: retakeFile,
      ineligibleFile: ineligibleFile
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-800" />
            Student Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Student Count */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">Current Student Count</h4>
                  <p className="text-sm text-blue-700">
                    Total students from selected sections
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
                  {currentStudentCount} Students
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-20 text-lg"
                onClick={() => document.getElementById('retake-file')?.click()}
              >
                <Upload className="w-6 h-6 mr-3" />
                Add Retake Students
              </Button>
              <Input
                id="retake-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleRetakeFileUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-20 text-lg"
                onClick={() => document.getElementById('ineligible-file')?.click()}
              >
                <Upload className="w-6 h-6 mr-3" />
                Remove Ineligible Students
              </Button>
              <Input
                id="ineligible-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleIneligibleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* File Display Section */}
          <div className="space-y-4">
            {/* Retake Students File */}
            {retakeFile && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-900">Retake Students File</h4>
                        <p className="text-sm text-green-700">{retakeFile.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeRetakeFile}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ineligible Students File */}
            {ineligibleFile && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-red-600" />
                      <div>
                        <h4 className="font-semibold text-red-900">Ineligible Students File</h4>
                        <p className="text-sm text-red-700">{ineligibleFile.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeIneligibleFile}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
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
