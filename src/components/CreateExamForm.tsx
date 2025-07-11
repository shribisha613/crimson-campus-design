import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";

interface CreateExamFormProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface FormErrors {
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

const CreateExamForm: React.FC<CreateExamFormProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const [formData, setFormData] = useState({
    name: data.name || "",
    date: data.date || "",
    startTime: data.startTime || "",
    endTime: data.endTime || "",
    description: data.description || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Exam name is required";
    if (!formData.date) newErrors.date = "Exam date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({ ...data, ...formData });
      onNext();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-red-800" />
          Create New Exam Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="examName">Exam Name *</Label>
            <Input
              id="examName"
              placeholder="e.g., Mid-term Mathematics Exam"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="examDate"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={`pl-10 ${errors.date ? "border-red-500" : ""}`}
                />
              </div>
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="examTime">Exam Time *</Label>
              <div className="flex items-center space-x-2 relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleChange("startTime", e.target.value)
                  }
                  className={`pl-10 pr-2 ${
                    errors.startTime ? "border-red-500" : ""
                  }`}
                />
                <span className="text-gray-500">to</span>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    handleChange("endTime", e.target.value)
                  }
                  className={`pl-2 ${errors.endTime ? "border-red-500" : ""}`}
                />
              </div>

              {(errors.startTime || errors.endTime) && (
                <p className="text-sm text-red-600">
                  {errors.startTime || errors.endTime}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about the exam..."
              value={formData.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-red-800 hover:bg-red-900">
              Continue to Program Selection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateExamForm;