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
    <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-2 mb-8 border border-white/10">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="w-full flex-grow">
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
            className="w-full h-14 px-4 bg-slate-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-100 placeholder-slate-400 transition-shadow text-lg"
            disabled={isLoading || isIdentifying}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          capture="environment"
        />
        <div className="w-full sm:w-auto flex items-center space-x-2">
            <button
              type="button"
              onClick={handleImageButtonClick}
              disabled={isLoading || isIdentifying}
              aria-label="Upload medicine image"
              className="flex-grow sm:flex-grow-0 sm:w-14 h-14 rounded-lg bg-gradient-to-r from-cyan-500/60 to-blue-500/60 backdrop-blur-xl border border-white/20 text-white shadow-md hover:from-cyan-500/70 hover:to-blue-500/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 disabled:shadow-none hover:shadow-[0_0_20px_theme(colors.cyan.500)]"
            >
              {isIdentifying ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                  <div className="w-7 h-7">
                      <CameraIcon />
                  </div>
              )}
            </button>
            <button
              type="submit"
              disabled={isLoading || isIdentifying || !query}
              className="flex-grow sm:flex-grow-0 sm:w-auto h-14 p-3 sm:px-6 rounded-lg bg-gradient-to-r from-cyan-500/60 to-blue-500/60 backdrop-blur-xl border border-white/20 text-white font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 shadow-md disabled:shadow-none hover:from-cyan-500/70 hover:to-blue-500/70 hover:shadow-[0_0_20px_theme(colors.cyan.500)]"
            >
              {isLoading || isIdentifying ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <div className="w-7 h-7"><SearchIcon /></div>
                  <span className="ml-2 hidden sm:inline text-lg">Search</span>
                </>
              )}
            </button>
        </div>
      </div>

       <div className="mt-3 mx-2 mb-1">
          <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Optional: Add a condition (e.g., kidney issue)"
              className="w-full p-2 bg-slate-800/50 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm text-slate-200 placeholder-slate-400 transition-shadow"
              disabled={isLoading || isIdentifying}
          />
      </div>
    </form>
  );
};