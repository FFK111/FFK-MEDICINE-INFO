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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setQuery(''); // Clear text query, as image is the source of truth now.
      
      onSearch('', file, condition);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query, imageFile, condition);
  };
  
  const currentPlaceholder = isLoading ? "Thinking..." : "Enter medicine name or pick a photo!";

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
            className="w-full h-14 pl-6 pr-6 bg-white comic-border rounded-full focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] text-text-dark placeholder-slate-500 transition-all text-lg font-semibold"
            disabled={isLoading}
        />
        <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Optional: Any health conditions? (e.g., pregnancy)"
            className="w-full p-3 bg-white border-2 border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] text-sm text-text-dark placeholder-slate-400 transition-all"
            disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={handleImageButtonClick}
          disabled={isLoading}
          aria-label="Upload medicine image"
          className="h-14 w-full rounded-full bg-accent-yellow comic-border comic-shadow-sm comic-shadow-sm-hover text-border-dark transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow font-bold text-lg"
        >
          <>
            <div className="w-6 h-6"><CameraIcon /></div>
            <span className="ml-3">Photo ID</span>
          </>
        </button>
        <button
          type="submit"
          disabled={isLoading || (!query && !imageFile)}
          className="h-14 w-full rounded-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-pink)] text-white comic-border comic-shadow comic-shadow-hover font-bold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0.5 text-lg"
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