import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { XIcon } from './icons/XIcon';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  imagePreviewUrl: string | null;
  onClearImage: () => void;
  isDisabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, imagePreviewUrl, onClearImage, isDisabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    handleDrag(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: React.DragEvent) => {
    handleDrag(e);
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative w-full h-40 sm:h-full flex items-center justify-center rounded-2xl comic-border transition-all duration-300 ${
        isDragging ? 'border-dashed border-accent-pink bg-accent-pink/20 scale-105' : 'bg-white/50 border-border-dark'
      } ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={isDisabled ? undefined : handleClick}
      role="button"
      tabIndex={0}
      aria-label="Image uploader and preview"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        capture="environment"
        disabled={isDisabled}
      />
      {imagePreviewUrl ? (
        <>
          <img src={imagePreviewUrl} alt="Medicine preview" className="w-full h-full object-cover rounded-xl" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the file input click
              onClearImage();
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Clear image"
            disabled={isDisabled}
          >
            <div className="w-5 h-5"><XIcon /></div>
          </button>
        </>
      ) : (
        <div className="text-center p-4 text-text-dark">
          <div className="w-12 h-12 mx-auto text-primary-blue"><CameraIcon /></div>
          <p className="mt-2 font-bold font-heading text-lg">
            {isDragging ? 'Drop it here!' : 'SCAN MEDICINE'}
          </p>
          <p className="text-sm font-semibold text-slate-600">or click to upload</p>
        </div>
      )}
    </div>
  );
};