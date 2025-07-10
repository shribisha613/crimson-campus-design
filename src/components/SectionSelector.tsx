
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, ArrowRight, ArrowLeft } from 'lucide-react';

interface SectionSelectorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [selectedSections, setSelectedSections] = useState(data.sections || []);

  const sections = [
    { id: 'A', name: 'Section A', students: 45, subject: 'Computer Science' },
    { id: 'B', name: 'Section B', students: 42, subject: 'Information Technology' },
    { id: 'C', name: 'Section C', students: 38, subject: 'Electronics' },
    { id: 'D', name: 'Section D', students: 40, subject: 'Mechanical' },
    { id: 'E', name: 'Section E', students: 35, subject: 'Civil' },
    { id: 'F', name: 'Section F', students: 33, subject: 'Electrical' }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSections(sections.map(s => s.id));
  };

  const handleDeselectAll = () => {
    setSelectedSections([]);
  };

  const handleContinue = () => {
    if (selectedSections.length > 0) {
      onUpdate({ 
        ...data, 
        sections: selectedSections 
      });
      onNext();
    }
  };

  const totalStudents = sections
    .filter(s => selectedSections.includes(s.id))
    .reduce((sum, s) => sum + s.students, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-800" />
              Select Sections
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                Deselect All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Card
                key={section.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSections.includes(section.id)
                    ? 'ring-2 ring-red-800 bg-red-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSectionToggle(section.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedSections.includes(section.id)}
                      onChange={() => handleSectionToggle(section.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{section.name}</h4>
                        <Badge variant="outline">{section.students} students</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{section.subject}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedSections.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Selection Summary</h4>
                    <p className="text-sm text-blue-700">
                      {selectedSections.length} sections selected with {totalStudents} total students
                    </p>
                  </div>
                  <Badge className="bg-blue-600">
                    {totalStudents} Students
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={selectedSections.length === 0}
              className="bg-red-800 hover:bg-red-900"
            >
              Continue to Student Management
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionSelector;
