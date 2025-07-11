
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
    // Nepal Block Rooms
    { id: 'fewa', name: 'Fewa', capacity: 45, building: 'Nepal Block', available: true },
    { id: 'machhapuchre', name: 'Machhapuchre', capacity: 50, building: 'Nepal Block', available: true },
    { id: 'nilgiri', name: 'Nilgiri', capacity: 40, building: 'Nepal Block', available: true },
    { id: 'tilicho', name: 'Tilicho', capacity: 35, building: 'Nepal Block', available: true },
    { id: 'gokyo', name: 'Gokyo', capacity: 55, building: 'Nepal Block', available: true },
    { id: 'begnas', name: 'Begnas', capacity: 42, building: 'Nepal Block', available: true },
    { id: 'rara', name: 'Rara', capacity: 38, building: 'Nepal Block', available: true },
    { id: 'annapurna', name: 'Annapurna', capacity: 48, building: 'Nepal Block', available: true },
    
    // UK Block Rooms
    { id: 'bigben', name: 'Big Ben', capacity: 60, building: 'UK Block', available: true },
    { id: 'openaccesslab', name: 'Open Access Lab', capacity: 30, building: 'UK Block', available: true },
    { id: 'stonehenge', name: 'Stonehenge', capacity: 55, building: 'UK Block', available: true },
    { id: 'kingstone', name: 'Kingstone', capacity: 45, building: 'UK Block', available: true },
    { id: 'thames', name: 'Thames', capacity: 50, building: 'UK Block', available: true },
  ];

  const availableRooms = rooms.filter(r => r.available);
  const totalCapacity = selectedRooms.reduce((sum, roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return sum + (room ? room.capacity : 0);
  }, 0);

  // Get current student count from previous steps
  const currentStudentCount = data.sections ? 
    data.sections.reduce((total: number, sectionId: string) => {
      const sectionStudentCounts: { [key: string]: number } = {
        'C1': 45, 'C2': 42, 'C3': 38, 'C4': 40, 'C5': 35, 'C6': 33,
        'C7': 41, 'C8': 39, 'C9': 37, 'C10': 44, 'C11': 36, 'C12': 43
      };
      return total + (sectionStudentCounts[sectionId] || 0);
    }, 0) : 0;

  const requiredStudents = currentStudentCount;
  const isCapacitySufficient = totalCapacity >= requiredStudents;

  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleSelectAllNepalBlock = () => {
    const nepalBlockRooms = rooms.filter(room => room.building === 'Nepal Block').map(room => room.id);
    setSelectedRooms(prev => {
      const otherRooms = prev.filter(id => !nepalBlockRooms.includes(id));
      return [...otherRooms, ...nepalBlockRooms];
    });
  };

  const handleSelectAllUKBlock = () => {
    const ukBlockRooms = rooms.filter(room => room.building === 'UK Block').map(room => room.id);
    setSelectedRooms(prev => {
      const otherRooms = prev.filter(id => !ukBlockRooms.includes(id));
      return [...otherRooms, ...ukBlockRooms];
    });
  };

  const handleSelectAllRooms = () => {
    setSelectedRooms(availableRooms.map(room => room.id));
  };

  const handleDeselectAllRooms = () => {
    setSelectedRooms([]);
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
          {/* Simple Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <div>
                  <span className="text-sm text-gray-600">Total Students:</span>
                  <span className="ml-2 font-semibold">{currentStudentCount}</span>
                </div>
                <div className={`${
                  isCapacitySufficient ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm">Selected Capacity:</span>
                  <span className="ml-2 font-semibold">{totalCapacity}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isCapacitySufficient 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isCapacitySufficient ? '✓ Sufficient' : '⚠ Insufficient'}
              </div>
            </div>
          </div>

          {/* Bulk Selection Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={handleSelectAllNepalBlock}>
              Select All Nepal Block
            </Button>
            <Button variant="outline" size="sm" onClick={handleSelectAllUKBlock}>
              Select All UK Block
            </Button>
            <Button variant="outline" size="sm" onClick={handleSelectAllRooms}>
              Select All Rooms
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAllRooms}>
              Deselect All
            </Button>
          </div>

          {/* Room Selection by Building Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nepal Block */}
            <div className="border border-red-200 rounded-lg">
              <div className="bg-red-50 p-3 border-b border-red-200">
                <h3 className="font-semibold text-red-800">Nepal Block</h3>
              </div>
              <div className="p-4 space-y-2">
                {availableRooms.filter(room => room.building === 'Nepal Block').map((room) => (
                  <div
                    key={room.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                      selectedRooms.includes(room.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-25'
                    }`}
                    onClick={() => handleRoomToggle(room.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onChange={() => handleRoomToggle(room.id)}
                      />
                      <span className="font-medium">{room.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {room.capacity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* UK Block */}
            <div className="border border-blue-200 rounded-lg">
              <div className="bg-blue-50 p-3 border-b border-blue-200">
                <h3 className="font-semibold text-blue-800">UK Block</h3>
              </div>
              <div className="p-4 space-y-2">
                {availableRooms.filter(room => room.building === 'UK Block').map((room) => (
                  <div
                    key={room.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                      selectedRooms.includes(room.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                    onClick={() => handleRoomToggle(room.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onChange={() => handleRoomToggle(room.id)}
                      />
                      <span className="font-medium">{room.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {room.capacity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
