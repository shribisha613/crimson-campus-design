import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Upload } from "lucide-react";

const Students = () => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importedFiles, setImportedFiles] = useState<{ [key: string]: string[] }>({
    BIT: ["BIT_2024.xlsx", "BIT_Regular_2024.xlsx"],
    BBA: ["BBA_Regular_2024.xlsx"],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const courses = ["BIT", "BBA"];

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      const fileName = file.name;

      // Add file to each selected course
      setImportedFiles((prev) => {
        const updated = { ...prev };
        selectedCourses.forEach((course) => {
          if (!updated[course]) updated[course] = [];
          if (!updated[course].includes(fileName)) {
            updated[course].push(fileName);
          }
        });
        return updated;
      });

      setImportDialogOpen(false);
    }
  };

  const handleDeleteFile = (program: string, fileName: string) => {
    setImportedFiles((prev) => ({
      ...prev,
      [program]: prev[program].filter((f) => f !== fileName),
    }));
  };

  const renderExcelFileInfo = (program: string) => {
    const files = importedFiles[program] || [];

    return (
      <div className="space-y-3">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border p-4 rounded-md shadow-sm bg-white"
          >
            <Badge variant="outline" className="text-sm px-4 py-2">
              {file}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteFile(program, file)}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        ))}
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
              <h1 className="text-3xl font-bold text-gray-900">
                Student Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage imported student records
              </p>
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
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Select Programs:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {courses.map((course) => (
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

                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleImport}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <Button
                      disabled={selectedCourses.length === 0}
                      onClick={() => fileInputRef.current?.click()}
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
                <Tabs defaultValue="files" className="w-full">

                  <TabsContent value="files" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        {renderExcelFileInfo(program)}
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