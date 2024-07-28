import React from 'react';

interface GuestTableCircleProps {
  seats: number;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const GuestTableCircle: React.FC<GuestTableCircleProps> = ({ seats, onDragOver, onDrop }) => {
  return (
    <div
      className="relative w-32 h-32 m-2"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="absolute inset-0 rounded-full bg-blue-200 flex items-center justify-center">
        <span className="text-black font-semibold">{seats} seats</span>
      </div>
      <div className="absolute top-0 right-0 flex space-x-1">
        <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          8
        </button>
        <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          9
        </button>
        <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          10
        </button>
      </div>
    </div>
  );
};

export default GuestTableCircle;