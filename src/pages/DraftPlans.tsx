import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Users,
  MapPin,
  UserCheck,
  FileText,
  Download,
} from "lucide-react";

const DraftPlans = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const draftPlans = [
    {
      id: 1,
      name: "Mid-term Mathematics Exam",
      date: "2024-01-15",
      time: "10:00 AM",
      program: "BIT",
      year: "2",
      sections: ["A", "B", "C"],
      students: 125,
      rooms: 4,
      status: "Completed",
      invigilatorsAssigned: true,
    },
    {
      id: 2,
      name: "Physics Final Examination",
      date: "2024-01-18",
      time: "02:00 PM",
      program: "BBA",
      year: "3",
      sections: ["A", "B"],
      students: 98,
      rooms: 3,
      status: "Ongoing",
      invigilatorsAssigned: true,
    },
    {
      id: 3,
      name: "Chemistry Lab Assessment",
      date: "2024-01-20",
      time: "09:00 AM",
      program: "BIT",
      year: "1",
      sections: ["A", "B", "C", "D"],
      students: 167,
      rooms: 5,
      status: "Pending",
      invigilatorsAssigned: false,
    },
  ];

  const filteredPlans = draftPlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600 text-white";
      case "Ongoing":
        return "bg-blue-600 text-white";
      case "Pending":
        return "bg-orange-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Draft Exam Plans</h1>
          <p className="text-gray-600 mt-1">
            Manage draft examination plans and assign invigilators
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6 shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search draft plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Draft Plans Table */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>All Draft Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invigilators</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{plan.date}</span>
                        <span className="text-sm text-gray-500">
                          {plan.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {plan.program} Year {plan.year}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        {plan.students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {plan.rooms}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          plan.invigilatorsAssigned
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-white"
                        }
                      >
                        {plan.invigilatorsAssigned ? "Assigned" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/assign-invigilator/${plan.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              plan.invigilatorsAssigned
                                ? "border-green-600 text-green-600 hover:bg-green-50"
                                : "border-red-800 text-red-800 hover:bg-red-50"
                            }
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            {plan.invigilatorsAssigned ? "View" : "Assign"}
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-gray-50"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DraftPlans;