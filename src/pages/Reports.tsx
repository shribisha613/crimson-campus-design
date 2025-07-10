
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Download, Calendar, Users, MapPin, FileText } from 'lucide-react';

const Reports = () => {
  const examStats = [
    { month: 'Jan', exams: 12, students: 890 },
    { month: 'Feb', exams: 15, students: 1120 },
    { month: 'Mar', exams: 18, students: 1340 },
    { month: 'Apr', exams: 14, students: 980 },
    { month: 'May', exams: 20, students: 1450 },
    { month: 'Jun', exams: 16, students: 1200 }
  ];

  const programData = [
    { name: 'B.Tech', value: 45, color: '#ef4444' },
    { name: 'M.Tech', value: 25, color: '#3b82f6' },
    { name: 'B.Sc', value: 20, color: '#10b981' },
    { name: 'M.Sc', value: 10, color: '#f59e0b' }
  ];

  const roomUtilization = [
    { room: 'Main Block', utilization: 85 },
    { room: 'Lab Block', utilization: 72 },
    { room: 'Auditorium', utilization: 65 },
    { room: 'Library', utilization: 58 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive examination reports and insights</p>
            </div>
            <Button className="bg-red-800 hover:bg-red-900">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Exams</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                  <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Students Examined</p>
                  <p className="text-3xl font-bold text-gray-900">6,980</p>
                  <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rooms Utilized</p>
                  <p className="text-3xl font-bold text-gray-900">28</p>
                  <p className="text-sm text-blue-600 mt-1">75% utilization rate</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">94.5%</p>
                  <p className="text-sm text-green-600 mt-1">↑ 2.1% from last term</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Exam Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Trends (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={examStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exams" fill="#ef4444" name="Exams" />
                  <Bar dataKey="students" fill="#3b82f6" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Program Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Program Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Room Utilization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Room Utilization Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomUtilization.map((item) => (
                <div key={item.room} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.room}</span>
                      <span className="text-sm text-gray-600">{item.utilization}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-800 h-2 rounded-full"
                        style={{ width: `${item.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exam Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Mathematics Final Exam completed</p>
                    <p className="text-sm text-gray-600">125 students • 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-600">Completed</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Physics Lab Test scheduled</p>
                    <p className="text-sm text-gray-600">89 students • Tomorrow 10:00 AM</p>
                  </div>
                  <Badge className="bg-blue-600">Scheduled</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium">Chemistry Viva in progress</p>
                    <p className="text-sm text-gray-600">45 students • Started 1 hour ago</p>
                  </div>
                  <Badge className="bg-orange-600">Ongoing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Excellent (90-100%)</span>
                  <span className="font-bold text-green-900">32%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">Good (75-89%)</span>
                  <span className="font-bold text-blue-900">45%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-800">Average (60-74%)</span>
                  <span className="font-bold text-yellow-900">18%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-800">Below Average (<60%)</span>
                  <span className="font-bold text-red-900">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
