import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, UserCheck, Folder, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      icon: Users,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Invigilators",
      value: "28",
      icon: UserCheck,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const recentExams = [
    {
      name: "Mid-term Mathematics",
      date: "2024-01-15",
      students: 125,
      status: "Completed",
    },
    {
      name: "Physics Final Exam",
      date: "2024-01-18",
      students: 98,
      status: "Ongoing",
    },
    {
      name: "Chemistry Lab Test",
      date: "2024-01-20",
      students: 67,
      status: "Scheduled",
    },
    {
      name: "Computer Science Viva",
      date: "2024-01-22",
      students: 89,
      status: "Scheduled",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="min-w-full bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin</h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Count</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ title, value, icon: Icon, color }) => (
              <Card
                key={title}
                className="w-full shadow-sm hover:shadow-lg transition duration-300 border border-gray-200 rounded-xl"
              >
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-3xl font-semibold text-gray-900">{value}</p>
                  </div>
                  <div className={`p-3 rounded-full shadow-sm ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Exams and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Exams */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle as="h2" className="text-xl font-semibold">Recent Exam Plans</CardTitle>
                  <Link to="/draft-plans">
                    <Button variant="outline" size="sm" aria-label="View all exam plans">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExams.map(({ name, date, students, status }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {format(new Date(date), "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {students} students
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`text-white ${
                          status === "Completed"
                            ? "bg-green-600"
                            : status === "Ongoing"
                            ? "bg-blue-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {status}
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
                <CardTitle as="h2" className="text-xl font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/create-exam" className="block">
                  <Button
                    className="w-full justify-start bg-red-800 hover:bg-red-900 transition-transform duration-200 hover:scale-[1.02]"
                    aria-label="Create exam plan"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Exam Plan
                  </Button>
                </Link>
                <Link to="/draft-plans" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-transform duration-200 hover:scale-[1.02]"
                    aria-label="View draft plans"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    View Draft Plans
                  </Button>
                </Link>
                <Link to="/students" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-transform duration-200 hover:scale-[1.02]"
                    aria-label="Manage students"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </Link>
                <Link to="/invigilators" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-transform duration-200 hover:scale-[1.02]"
                    aria-label="Manage invigilators"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Manage Invigilators
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;