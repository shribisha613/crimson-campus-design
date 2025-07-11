
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

interface RoomSelectorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ data, onUpdate, onNext, onPrevious }) => {
  const [selectedRooms, setSelectedRooms] = useState(data.rooms || []);

  const rooms = [
    { id: 'LT02', name: 'Rupa', capacity: 30, building: 'Nepal Block', available: true },
    { id: 'Lab03', name: 'Nilgiri', capacity: 35, building: 'Nepal Block', available: true },
    { id: 'LT01', name: 'Machhapuchchhre', capacity: 40, building: 'Nepal Block', available: false },
    { id: 'LT03', name: 'Annapurna', capacity: 30, building: 'Nepal Block', available: true },
    { id: 'SR01', name: 'Fewa', capacity: 25, building: 'Nepal Block', available: true },
    { id: 'SR02', name: 'Tillicho', capacity: 100, building: 'Nepal Block', available: true },
  ];

  const availableRooms = rooms.filter(r => r.available);
  const totalCapacity = selectedRooms.reduce((sum, roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return sum + (room ? room.capacity : 0);
  }, 0);

  const requiredStudents = data.students?.length || 0;
  const isCapacitySufficient = totalCapacity >= requiredStudents;

  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleAutoGenerate = () => {
    // Auto-select rooms based on student count
    let studentsLeft = requiredStudents;
    const autoSelected = [];
    
    for (const room of availableRooms.sort((a, b) => b.capacity - a.capacity)) {
      if (studentsLeft > 0) {
        autoSelected.push(room.id);
        studentsLeft -= room.capacity;
      }
    }
    
    setSelectedRooms(autoSelected);
  };

  const handleFinalize = () => {
    if (selectedRooms.length > 0 && isCapacitySufficient) {
      onUpdate({ 
        ...data, 
        rooms: selectedRooms 
      });
      // Here you would typically save to database
      console.log('Exam plan finalized:', { ...data, rooms: selectedRooms });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-800" />
              Select Examination Rooms
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Capacity Alert */}
          {requiredStudents > 0 && (
            <Alert className={isCapacitySufficient ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {isCapacitySufficient ? (
                  <span className="text-green-800">
                    ✓ Capacity sufficient: {totalCapacity} seats for {requiredStudents} students
                  </span>
                ) : (
                  <span className="text-orange-800">
                    ⚠ Need more capacity: {totalCapacity} seats for {requiredStudents} students 
                    (Need {requiredStudents - totalCapacity} more seats)
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRooms.map((room) => (
              <Card
                key={room.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRooms.includes(room.id)
                    ? 'ring-2 ring-red-800 bg-red-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleRoomToggle(room.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{room.name}</h4>
                      <p className="text-sm text-gray-600">{room.building}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {room.capacity} seats
                      </Badge>
                      {selectedRooms.includes(room.id) && (
                        <div className="flex justify-end">
                          <CheckCircle className="w-4 h-4 text-red-800" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Rooms Summary */}
          {selectedRooms.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Selected Rooms Summary</h4>
                <div className="space-y-2">
                  {selectedRooms.map(roomId => {
                    const room = rooms.find(r => r.id === roomId);
                    return room ? (
                      <div key={roomId} className="flex justify-between text-sm">
                        <span>{room.name} ({room.building})</span>
                        <span>{room.capacity} seats</span>
                      </div>
                    ) : null;
                  })}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Capacity:</span>
                    <span>{totalCapacity} seats</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleFinalize}
              disabled={selectedRooms.length === 0 || !isCapacitySufficient}
              className="bg-red-800 hover:bg-red-900"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Generate Seat Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSelector;
