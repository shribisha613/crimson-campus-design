
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, Filter, Download, FileText, BarChart3, TrendingUp, Users, MapPin } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const examReports = [
    {
      id: 1,
      name: 'Mid-term Mathematics Report',
      date: '2024-01-15',
      program: 'B.Tech',
      year: '2',
      students: 125,
      attendance: 98,
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Physics Final Report',
      date: '2024-01-18',
      program: 'B.Sc',
      year: '3',
      students: 98,
      attendance: 95,
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Chemistry Lab Report',
      date: '2024-01-20',
      program: 'B.Tech',
      year: '1',
      students: 167,
      attendance: 160,
      status: 'Completed'
    }
  ];

  const filteredReports = examReports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-600';
      case 'In Progress': return 'bg-blue-600';
      case 'Pending': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1">View and analyze examination reports</p>
            </div>
            <Button className="bg-red-800 hover:bg-red-900">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Exams</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <FileText className="h-8 w-8 text-red-800" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                </div>
                <Users className="h-8 w-8 text-red-800" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                  <p className="text-3xl font-bold text-gray-900">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-800" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-900">18</p>
                </div>
                <MapPin className="h-8 w-8 text-red-800" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="exam-reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exam-reports">Exam Reports</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="exam-reports">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports Table */}
            <Card>
              <CardHeader>
                <CardTitle>Examination Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.program} Year {report.year}</Badge>
                        </TableCell>
                        <TableCell>{report.students}</TableCell>
                        <TableCell>
                          <span className="text-green-600 font-medium">
                            {report.attendance}/{report.students} ({Math.round((report.attendance / report.students) * 100)}%)
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Monthly Attendance Trend</h3>
                        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                          <BarChart3 className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-gray-500">Chart Placeholder</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Department-wise Attendance</h3>
                        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                          <BarChart3 className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-gray-500">Chart Placeholder</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Exam Success Rate</h3>
                      <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">Analytics Chart</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Resource Utilization</h3>
                      <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">Utilization Chart</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
