import React, { useState } from 'react';

interface NameInputProps {
  onAddGuest: (name: string) => void;
  className?: string;
}

const NameInput: React.FC<NameInputProps> = ({ onAddGuest }) => {
    const [name, setName] = useState('');
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handleAddGuest = (event: React.FormEvent) => {
      event.preventDefault();
      onAddGuest(name);
      setName('');
    };
  
    return (
      <form onSubmit={handleAddGuest}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder=" Enter name"
          className="bg-white text-black rounded-lg shadow-lg text-center w-full"
        />
      </form>
    );
  };

export default NameInput;