'use client';

import React, { useState, useEffect, useCallback } from 'react';

import NameInput from './NameInput';
import GuestTable, { Guest } from './GuestTable';
import DraggableCard from './DraggableCard';
import TopTable from './TopTable';
import GuestTableCircle from './GuestTableCircle';

export default function Home() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [alfieCeremonyCount, setAlfieCeremonyCount] = useState(0);
  const [liahCeremonyCount, setLiahCeremonyCount] = useState(0);
  const [alfieTotalCount, setAlfieTotalCount] = useState(0);
  const [liahTotalCount, setLiahTotalCount] = useState(0);
  const [guestTables, setGuestTables] = useState<number[]>([]);

  useEffect(() => {
    updateCounts();
  }, [guests]);

  const updateCounts = () => {
    const alfie_ceremony = guests.filter(g => g.alfie && g.ceremony).length;
    const liah_ceremony = guests.filter(g => g.liah && g.ceremony).length;
    const alfie_total = guests.filter(g => g.alfie).length;
    const liah_total = guests.filter(g => g.liah).length;
    setAlfieCeremonyCount(alfie_ceremony);
    setLiahCeremonyCount(liah_ceremony);
    setAlfieTotalCount(alfie_total);
    setLiahTotalCount(liah_total);
  };

  const addGuest = (name: string) => {
    const newGuest: Guest = { 
      id: Date.now().toString(),
      name, 
      ceremony: false, 
      alfie: false, 
      liah: false, 
      tier: 'A' 
    };
    setGuests(prevGuests => [...prevGuests, newGuest]);
  };

  const updateGuest = useCallback((id: string, field: keyof Guest, value: string | boolean | 'A' | 'B' | 'C' | 'D') => {
    console.log(`Updating guest ${id}, field: ${field}, value: ${value}`);
    setGuests(prevGuests => prevGuests.map(guest => 
      guest.id === id ? { ...guest, [field]: value } : guest
    ));
  }, []);

  const deleteGuest = useCallback((id: string) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  }, []);

  const addGuestTable = () => {
    setGuestTables([...guestTables, 8]);
  };

  const onDragStart = (e: React.DragEvent, guestId: string) => {
    e.dataTransfer.setData('text/plain', guestId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, tableIndex: number) => {
    e.preventDefault();
    const guestId = e.dataTransfer.getData('text');
    // Here you would update the guest's assigned table
    console.log(`Dropped guest ${guestId} onto table ${tableIndex}`);
    // Implement the logic to update the guest's assigned table
  };

  return (
    <div className="p-8 flex flex-col h-screen" style={{ backgroundColor: '#F0FFF0', fontFamily: 'Bradley Hand' }}>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-1/3 pr-4 overflow-auto">
          <div className="mb-4">
            <NameInput onAddGuest={addGuest} />
          </div>
          <GuestTable guests={guests} updateGuest={updateGuest} deleteGuest={deleteGuest} />
        </div>
        <div className="w-2/3 flex flex-col overflow-hidden">
          <div className="mb-5 text-black text-4xl font-bold text-center">Wedding Seating Planner</div>
          <div className="mb-4 text-center">
            <span className="mr-4 text-black">Alfie (ceremony): {alfieCeremonyCount}/25</span>
            <span className="mr-4 text-black">Alfie (total): {alfieTotalCount}/50</span>
            <span className="mr-4 text-black">Liah (ceremony): {liahCeremonyCount}/25</span>
            <span className="mr-4 text-black">Liah (total): {liahTotalCount}/50</span>
          </div>
          <div className="mb-4 text-black text-2xl text-center">Head table</div>
          <TopTable />
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-shrink-0 h-1/3 overflow-auto p-2 bg-gray-100">
              <div className="flex flex-wrap">
                {guests.filter(guest => guest.ceremony).map((guest) => (
                  <DraggableCard 
                    key={guest.id} 
                    guest={guest} 
                    updateGuest={(field, value) => updateGuest(guest.id, field, value)}
                    onDragStart={(e) => onDragStart(e, guest.id)}
                  />
                ))}
              </div>
            </div>
            <div className="flex-grow overflow-auto p-2">
              <button onClick={addGuestTable} className="mb-4 bg-green-100 text-black p-2 rounded">+ Add Table</button>
              <div className="flex flex-wrap">
                {guestTables.map((seats, index) => (
                  <GuestTableCircle
                    key={index}
                    seats={seats}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}