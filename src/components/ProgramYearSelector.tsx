
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProgramYearSelectorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ProgramYearSelector: React.FC<ProgramYearSelectorProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [selectedProgram, setSelectedProgram] = useState(data.program || '');
  const [selectedYear, setSelectedYear] = useState(data.year || '');

  const programs = [
    { id: 'btech', name: 'B.Tech', description: 'Bachelor of Technology' },
    { id: 'mtech', name: 'M.Tech', description: 'Master of Technology' },
    { id: 'bsc', name: 'B.Sc', description: 'Bachelor of Science' },
    { id: 'msc', name: 'M.Sc', description: 'Master of Science' },
    { id: 'ba', name: 'B.A', description: 'Bachelor of Arts' },
    { id: 'ma', name: 'M.A', description: 'Master of Arts' }
  ];

  const years = [
    { id: '1', name: 'First Year', students: 250 },
    { id: '2', name: 'Second Year', students: 230 },
    { id: '3', name: 'Third Year', students: 210 },
    { id: '4', name: 'Fourth Year', students: 195 }
  ];

  const handleContinue = () => {
    if (selectedProgram && selectedYear) {
      onUpdate({ 
        ...data, 
        program: selectedProgram, 
        year: selectedYear 
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-800" />
            Select Program and Year
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Program Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {programs.map((program) => (
                <Card
                  key={program.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProgram === program.id
                      ? 'ring-2 ring-red-800 bg-red-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedProgram(program.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{program.name}</h4>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                      {selectedProgram === program.id && (
                        <Badge className="bg-red-800">Selected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Year Selection */}
          {selectedProgram && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Academic Year</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {years.map((year) => (
                  <Card
                    key={year.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedYear === year.id
                        ? 'ring-2 ring-red-800 bg-red-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedYear(year.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{year.name}</h4>
                          <p className="text-sm text-gray-600">{year.students} students enrolled</p>
                        </div>
                        {selectedYear === year.id && (
                          <Badge className="bg-red-800">Selected</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!selectedProgram || !selectedYear}
              className="bg-red-800 hover:bg-red-900"
            >
              Continue to Sections
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramYearSelector;
