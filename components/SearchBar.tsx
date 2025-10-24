import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { identifyMedicineFromImage } from '../services/geminiService';
import { ImageUploader } from './ImageUploader'; // Import new component

interface SearchBarProps {
  onSearch: (query: string, imageFile: File | null, condition: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isIdentifyingImage, setIsIdentifyingImage] = useState(false);

  // Effect to manage the image preview URL lifecycle
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreviewUrl(objectUrl);
      
      // Cleanup function to revoke the object URL
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreviewUrl(null);
    }
  }, [imageFile]);

  const handleFileSelect = async (file: File) => {
    setImageFile(file);
    setQuery(''); // Clear previous text query
    
    setIsIdentifyingImage(true);
    try {
      const medicineName = await identifyMedicineFromImage(file);
      setQuery(medicineName); // Set the identified name in the search bar
      // No need to call onSearch here, it will be called on form submit
    } catch (e) {
      console.error("Failed to identify medicine from image", e);
      // Let user submit with just the image if identification fails
      setQuery('Unable to identify, searching by image...');
    } finally {
      setIsIdentifyingImage(false);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    if (query === 'Unable to identify, searching by image...') {
      setQuery('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query, imageFile, condition);
  };
  
  const currentPlaceholder = isIdentifyingImage ? "Identifying from photo..." : (isLoading ? "Thinking..." : "Enter medicine name");
  const isSearchDisabled = isLoading || isIdentifyingImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column for inputs */}
        <div className="space-y-3 flex flex-col">
          <input
              type="text"
              value={query}
              onChange={(e) => {
                  setQuery(e.target.value);
                  if (imageFile) {
                    setImageFile(null); // Clear image if user types
                  }
              }}
              placeholder={currentPlaceholder}
              className="w-full h-14 pl-6 pr-6 bg-white comic-border rounded-full focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] text-text-dark placeholder-slate-500 transition-all text-lg font-semibold"
              disabled={isSearchDisabled}
          />
          <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Optional: Any health conditions?"
              className="w-full p-3 bg-white border-2 border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] text-sm text-text-dark placeholder-slate-400 transition-all"
              disabled={isSearchDisabled}
          />
           <div className="flex-grow hidden md:block"></div> {/* Spacer for alignment */}
          <button
            type="submit"
            disabled={isSearchDisabled || (!query && !imageFile)}
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

        {/* Right Column for Image Uploader */}
        <div className="h-full">
          <ImageUploader
            onFileSelect={handleFileSelect}
            imagePreviewUrl={imagePreviewUrl}
            onClearImage={handleClearImage}
            isDisabled={isSearchDisabled}
          />
        </div>
      </div>
    </form>
  );
};