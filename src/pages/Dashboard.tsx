import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, UserCheck, Folder } from "lucide-react";

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
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Current Count
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="w-full shadow-sm hover:shadow-lg transition duration-300 border border-gray-200 rounded-xl"
              >
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full shadow-sm ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Create & Manage */}
            <Card className="h-full border border-gray-200 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Create & Manage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/create-exam">
                  <Button className="w-full justify-start bg-red-700 hover:bg-red-800 text-white transition duration-200">
                    <Calendar className="w-5 h-5 mr-2" />
                    Create Exam Plan
                  </Button>
                </Link>
                <Link to="/draft-plans">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-100 transition"
                  >
                    <Folder className="w-5 h-5 mr-2" />
                    View Draft Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* People Management */}
            <Card className="h-full border border-gray-200 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  People Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/students">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-100 transition"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Manage Students
                  </Button>
                </Link>
                <Link to="/invigilators">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-100 transition"
                  >
                    <UserCheck className="w-5 h-5 mr-2" />
                    Manage Invigilators
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
