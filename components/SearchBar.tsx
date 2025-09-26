import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: string, imageFile: File | null, condition: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setFileName(file.name);
      setQuery(''); // Clear text query when image is selected
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query, imageFile, condition);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-2 mb-8 border border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
              setQuery(e.target.value);
              if (imageFile) {
                setImageFile(null);
                setFileName('');
              }
          }}
          placeholder="Enter medicine name (e.g., Adol, Disprin)"
          className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          disabled={isLoading || !!imageFile}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          capture="environment"
        />
        <button
          type="button"
          onClick={handleImageButtonClick}
          disabled={isLoading}
          aria-label="Upload medicine image"
          className="p-3 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <CameraIcon />
        </button>
        <button
          type="submit"
          disabled={isLoading || (!query && !imageFile)}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-100"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <SearchIcon />
          )}
        </button>
      </div>
       {fileName && <span className="text-sm text-gray-500 truncate ml-4 py-1 block">{fileName}</span>}

       <div className="mt-3 mx-2 mb-1">
          <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Optional: Add condition (e.g., pregnancy, kidney disease)"
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-700 placeholder-gray-400 transition-shadow"
              disabled={isLoading}
          />
      </div>
    </form>
  );
};