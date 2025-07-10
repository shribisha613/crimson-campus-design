
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Filter, Plus, Edit, Trash2, Building, Users } from 'lucide-react';

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const rooms = [
    { id: 1, name: 'Room 101', capacity: 30, floor: 1, building: 'Main Block', type: 'Classroom', available: true, equipment: ['Projector', 'AC'] },
    { id: 2, name: 'Room 102', capacity: 35, floor: 1, building: 'Main Block', type: 'Classroom', available: true, equipment: ['Projector', 'AC', 'Smart Board'] },
    { id: 3, name: 'Room 201', capacity: 40, floor: 2, building: 'Main Block', type: 'Lecture Hall', available: false, equipment: ['Projector', 'AC', 'Audio System'] },
    { id: 4, name: 'Room 202', capacity: 30, floor: 2, building: 'Main Block', type: 'Classroom', available: true, equipment: ['Projector'] },
    { id: 5, name: 'Computer Lab 1', capacity: 20, floor: 1, building: 'Lab Block', type: 'Laboratory', available: true, equipment: ['Computers', 'Projector', 'AC'] },
    { id: 6, name: 'Auditorium 1', capacity: 100, floor: 1, building: 'Auditorium Block', type: 'Auditorium', available: true, equipment: ['Stage', 'Audio System', 'Projector', 'AC'] }
  ];

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableRooms = rooms.filter(r => r.available).length;
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const buildings = [...new Set(rooms.map(r => r.building))].length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Classroom': return 'bg-blue-600';
      case 'Laboratory': return 'bg-green-600';
      case 'Lecture Hall': return 'bg-purple-600';
      case 'Auditorium': return 'bg-orange-600';
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
              <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
              <p className="text-gray-600 mt-1">Manage examination rooms and facilities</p>
            </div>
            <Button className="bg-red-800 hover:bg-red-900">
              <Plus className="w-4 h-4 mr-2" />
              Add New Room
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-900">{rooms.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Available</p>
                  <p className="text-3xl font-bold text-green-900">{availableRooms}</p>
                </div>
                <Badge className="bg-green-600">Ready</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Total Capacity</p>
                  <p className="text-3xl font-bold text-blue-900">{totalCapacity}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">Buildings</p>
                  <p className="text-3xl font-bold text-purple-900">{buildings}</p>
                </div>
                <Building className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search rooms by name, building, or type..."
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

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className={`${room.available ? 'hover:shadow-lg' : 'opacity-75'} transition-all`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Badge className={room.available ? 'bg-green-600' : 'bg-red-600'}>
                    {room.available ? 'Available' : 'Occupied'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Capacity</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity} seats
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Floor</p>
                    <p className="font-semibold">Floor {room.floor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Building</p>
                    <p className="font-semibold">{room.building}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Type</p>
                    <Badge className={getTypeColor(room.type)} variant="secondary">
                      {room.type}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Equipment</p>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
