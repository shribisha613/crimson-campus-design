

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Users, UserCheck, FileText, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Active Exam Plans', value: '12', icon: Calendar, color: 'bg-blue-50 text-blue-700' },
    { title: 'Total Students', value: '1,247', icon: Users, color: 'bg-green-50 text-green-700' },
    { title: 'Invigilators', value: '28', icon: UserCheck, color: 'bg-purple-50 text-purple-700' },
    { title: 'Completed Exams', value: '156', icon: FileText, color: 'bg-orange-50 text-orange-700' }
  ];

  const recentExams = [
    { name: 'Mid-term Mathematics', date: '2024-01-15', students: 125, status: 'Completed' },
    { name: 'Physics Final Exam', date: '2024-01-18', students: 98, status: 'Ongoing' },
    { name: 'Chemistry Lab Test', date: '2024-01-20', students: 67, status: 'Scheduled' },
    { name: 'Computer Science Viva', date: '2024-01-22', students: 89, status: 'Scheduled' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RTE Dashboard</h1>
              <p className="text-gray-600 mt-1">Department of Education - Exam Management</p>
            </div>
            <Link to="/create-exam">
              <Button className="bg-red-800 hover:bg-red-900">
                <Calendar className="w-4 h-4 mr-2" />
                Create New Exam Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Exams */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Exam Plans</CardTitle>
                  <Link to="/draft-plans">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExams.map((exam) => (
                    <div key={exam.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-semibold">{exam.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {exam.students} students
                          </span>
                        </div>
                      </div>
                      <Badge 
                        className={
                          exam.status === 'Completed' ? 'bg-green-600' :
                          exam.status === 'Ongoing' ? 'bg-blue-600' : 'bg-gray-600'
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/create-exam" className="block">
                  <Button className="w-full justify-start bg-red-800 hover:bg-red-900">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Exam Plan
                  </Button>
                </Link>
                <Link to="/students" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </Link>
                <Link to="/invigilators" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Manage Invigilators
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-600">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup</span>
                  <Badge className="bg-green-600">Updated</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Sync</span>
                  <span className="text-sm text-gray-600">2 min ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
