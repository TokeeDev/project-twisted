'use client';

import React, { useState, useEffect } from 'react';
import { Utensils, DollarSign, Tag, Upload, Info } from 'lucide-react';
import { generateReactHelpers } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

// Initialize UploadThing helpers
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface MenuItemFormProps {
  // Add props if needed for editing existing items, e.g., initialData
  onSuccess?: () => void; // Callback on successful submission
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      if (!res || res.length === 0) {
        setMessage({ text: 'Image upload failed or returned no URL.', type: 'error' });
        setIsSubmitting(false);
        return;
      }
      const imageUrl = res[0].url;
      console.log('Image uploaded successfully:', imageUrl);

      // Now submit the rest of the form data along with the image URL
      await submitMenuItemData(imageUrl);
    },
    onUploadError: (error: Error) => {
      console.error('Error uploading image:', error);
      setMessage({ text: `Error uploading image: ${error.message}`, type: 'error' });
      setIsSubmitting(false); // Ensure submission state is reset on error
    },
    onUploadBegin: () => {
      setMessage({ text: 'Uploading image...', type: 'info' });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    setMessage({ text: '', type: '' });
    setIsSubmitting(false);
  };

  const submitMenuItemData = async (imageUrl: string) => {
    setMessage({ text: 'Submitting menu item data...', type: 'info' });
    try {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price, // Ensure backend handles price string appropriately
          category,
          imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setMessage({ text: 'Menu item created successfully!', type: 'success' });
      resetForm();
      if (onSuccess) onSuccess(); // Call success callback if provided

    } catch (error) {
      console.error('Error submitting menu item:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setMessage({ text: `Error creating menu item: ${errorMessage}`, type: 'error' });
    } finally {
      setIsSubmitting(false); // Ensure submission state is reset
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      setMessage({ text: 'Name and Price are required fields.', type: 'error' });
      return;
    }

    if (!imageFile) {
      setMessage({ text: 'Please upload a menu item image.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: 'Starting submission process...', type: 'info' });

    // Start image upload first
    try {
      await startUpload([imageFile]);
      // The rest of the submission logic happens in onClientUploadComplete
    } catch (error) {
        // Error during the *initiation* of the upload (rare)
        console.error("Error initiating upload:", error);
        setMessage({ text: 'Error starting upload process.', type: 'error' });
        setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-gray-800/50 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-twisted-neon">Add New Menu Item</h2>

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 rounded-md p-3 text-sm text-center ${ 
          message.type === 'success' ? 'bg-green-600/30 text-green-300 border border-green-500' :
          message.type === 'error' ? 'bg-red-600/30 text-red-300 border border-red-500' :
          'bg-blue-600/30 text-blue-300 border border-blue-500'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Item Image *</label>
          <div className="relative mb-2 aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50">
            {previewUrl ? (
              <img src={previewUrl} alt="Menu item preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
                <Upload size={40} className="mb-2" />
                <span>Image Preview</span>
              </div>
            )}
          </div>
          <label htmlFor="image-upload" className="block w-full max-w-xs mx-auto cursor-pointer rounded-md bg-twisted-neon px-4 py-2 text-center text-sm font-semibold text-black transition hover:bg-twisted-neon/80">
            {imageFile ? 'Change Image' : 'Select Image'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            required
          />
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Utensils size={16} />
              </span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-1 focus:ring-twisted-neon focus:border-twisted-neon"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <DollarSign size={16} />
              </span>
              <input
                type="text" // Keep as text for flexibility (e.g., "$10", "Market Price")
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-1 focus:ring-twisted-neon focus:border-twisted-neon"
                placeholder="e.g., $12.99 or Market Price"
                required
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Tag size={16} />
            </span>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-1 focus:ring-twisted-neon focus:border-twisted-neon"
              placeholder="e.g., Appetizers, Main Courses, Drinks"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <div className="relative">
             <span className="absolute top-3 left-0 flex items-center pl-3 text-gray-500">
                <Info size={16} />
              </span>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-1 focus:ring-twisted-neon focus:border-twisted-neon"
              placeholder="Optional: Add details about the item..."
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className={`w-full px-6 py-3 rounded-md font-semibold text-black transition duration-200 flex items-center justify-center ${isSubmitting || isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-twisted-neon hover:bg-twisted-neon/80'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {message.text.includes('Uploading') ? 'Uploading...' : 'Submitting...'}
              </>
            ) : (
              'Add Menu Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;