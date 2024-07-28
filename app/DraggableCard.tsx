import React from 'react';
import Draggable from 'react-draggable';

interface Guest {
    name: string;
    ceremony: boolean;
    alfie: boolean;
    liah: boolean;
    tier: 'A' | 'B' | 'C' | 'D';
  }

interface DraggableCardProps {
  guest: Guest;
  updateGuest: (field: keyof Guest, value: any) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ guest, updateGuest, onDragStart }) => {
  const tierColors = {
    A: 'bg-green-200',
    B: 'bg-yellow-200',
    C: 'bg-orange-200',
    D: 'bg-red-200'
  };

  return (
    <Draggable>
      <div 
        draggable
        onDragStart={onDragStart}
        className={`${tierColors[guest.tier]} p-2 m-2 rounded shadow cursor-move relative`} style={{ zIndex: 2 }}>
        <p className="text-black font-bold">{guest.name}</p>
      </div>
    </Draggable>
  );
};

export default DraggableCard;