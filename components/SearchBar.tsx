import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { SearchIcon } from './icons/SearchIcon';
import { getMedicineNameFromImage } from '../services/geminiService';

interface SearchBarProps {
  onSearch: (query: string, imageFile: File | null, condition: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setQuery(''); // Clear text query
      
      setIsIdentifying(true);
      try {
        const medicineName = await getMedicineNameFromImage(file);
        setQuery(medicineName); // Set identified name in the input
        // Automatically trigger search
        onSearch(medicineName, file, condition);
      } catch (error) {
        console.error("Error identifying medicine from image:", error);
        setQuery("Could not identify medicine. Please type it.");
      } finally {
        setIsIdentifying(false);
      }
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query, imageFile, condition);
  };
  
  const currentPlaceholder = isIdentifying ? "Identifying medicine from image..." : "Enter medicine name...";

  return (
    <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg p-2 mb-8 border border-white/30">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="w-full flex-grow flex items-center bg-white/40 rounded-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                if (imageFile) {
                  setImageFile(null);
                }
            }}
            placeholder={currentPlaceholder}
            className="w-full p-3 bg-transparent focus:outline-none text-slate-800 placeholder-slate-500"
            disabled={isLoading || isIdentifying}
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
            disabled={isLoading || isIdentifying}
            aria-label="Upload medicine image"
            className="p-3 rounded-lg text-slate-600 hover:text-blue-600 transition-all duration-200 disabled:opacity-50 transform hover:scale-110 active:scale-95"
          >
            <CameraIcon />
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading || isIdentifying || !query}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold p-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 disabled:from-blue-300 disabled:to-cyan-300 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 shadow-md disabled:shadow-none"
        >
          {isLoading || isIdentifying ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              <SearchIcon />
              <span className="ml-2 hidden sm:inline">Search</span>
            </>
          )}
        </button>
      </div>

       <div className="mt-3 mx-2 mb-1">
          <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Optional: Add a condition (e.g., pregnancy)"
              className="w-full p-2 bg-white/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-slate-700 placeholder-slate-500 transition-shadow"
              disabled={isLoading || isIdentifying}
          />
      </div>
    </form>
  );
};