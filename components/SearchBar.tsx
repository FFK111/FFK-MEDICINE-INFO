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
        setQuery("Could not identify. Please type it.");
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
  
  const currentPlaceholder = isIdentifying ? "Identifying from image..." : "Enter medicine name...";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
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
            className="w-full h-14 pl-6 pr-6 bg-slate-800/70 border-2 border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--brand-electric-blue)] focus:border-[var(--brand-electric-blue)] text-slate-100 placeholder-slate-400 transition-all text-lg"
            disabled={isLoading || isIdentifying}
        />
        <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Optional: Check safety for a condition (e.g., pregnancy)"
            className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--brand-electric-blue)] focus:border-[var(--brand-electric-blue)] text-sm text-slate-200 placeholder-slate-500 transition-all"
            disabled={isLoading || isIdentifying}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={handleImageButtonClick}
          disabled={isLoading || isIdentifying}
          aria-label="Upload medicine image"
          className="h-14 w-full rounded-full bg-slate-800/70 border-2 border-slate-700 text-slate-300 hover:text-[var(--brand-electric-blue)] hover:border-[var(--brand-electric-blue)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-electric-blue)] font-bold"
        >
          {isIdentifying ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--brand-electric-blue)]"></div>
          ) : (
            <>
              <div className="w-6 h-6"><CameraIcon /></div>
              <span className="ml-3">Identify by Image</span>
            </>
          )}
        </button>
        <button
          type="submit"
          disabled={isLoading || isIdentifying || !query}
          className="h-14 w-full rounded-full bg-gradient-to-r from-[var(--brand-electric-blue)] to-[var(--brand-magenta)] text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 shadow-lg shadow-[var(--glow-color-blue)]/50 hover:shadow-[var(--glow-color-blue)] disabled:shadow-none text-lg"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              <div className="w-6 h-6"><SearchIcon /></div>
              <span className="ml-3">Search</span>
            </>
          )}
        </button>
      </div>

      <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          capture="environment"
      />
    </form>
  );
};