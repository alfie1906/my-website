import React, { useEffect } from 'react';

export interface Guest {
  id: string; // Add a unique identifier for each guest
  name: string;
  ceremony: boolean;
  alfie: boolean;
  liah: boolean;
  tier: 'A' | 'B' | 'C' | 'D';
}

interface GuestTableProps {
  guests: Guest[];
  updateGuest: (id: string, field: keyof Guest, value: string | boolean | 'A' | 'B' | 'C' | 'D') => void;
  deleteGuest: (id: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, updateGuest, deleteGuest }) => {
  useEffect(() => {
    console.log('GuestTable re-rendered');
  }, [guests]);

  const sortedGuests = [...guests].sort((a, b) => {
    if (a.tier !== b.tier) return a.tier.localeCompare(b.tier);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left text-black">Name</th>
            <th className="border border-gray-300 p-2 text-center text-black">Ceremony</th>
            <th className="border border-gray-300 p-2 text-center text-black">Alfie</th>
            <th className="border border-gray-300 p-2 text-center text-black">Liah</th>
            <th className="border border-gray-300 p-2 text-center text-black">Tier</th>
            <th className="border border-gray-300 p-2 text-center text-black">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedGuests.map((guest) => (
            <tr key={guest.id}>
              <td className="border border-gray-300 p-2 text-left text-black">{guest.name}</td>
              <td className="border border-gray-300 p-2 text-center">
                <input 
                  type="checkbox" 
                  checked={guest.ceremony} 
                  onChange={(e) => updateGuest(guest.id, 'ceremony', e.target.checked)} 
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input 
                  type="checkbox" 
                  checked={guest.alfie} 
                  onChange={(e) => updateGuest(guest.id, 'alfie', e.target.checked)} 
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input 
                  type="checkbox" 
                  checked={guest.liah} 
                  onChange={(e) => updateGuest(guest.id, 'liah', e.target.checked)} 
                />
              </td>
              <td className="border border-gray-300 p-2 text-center text-black">
                <select 
                  value={guest.tier} 
                  onChange={(e) => updateGuest(guest.id, 'tier', e.target.value as 'A' | 'B' | 'C' | 'D')}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2 text-center text-black">
                <button onClick={() => deleteGuest(guest.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;