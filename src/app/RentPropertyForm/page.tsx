"use client";
import IFormData from '@/interfaces/FormData';
import React, { useState } from 'react';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dddh5wrx3/image/upload";
const UPLOAD_PRESET = "ml_default";

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    description: '',
    state: '',
    city: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    isAvailable: true,
    capacity: 1,
    street: '',          // Añadido
    number: 0,          // Añadido
    postalCode: '',      // Añadido
    photos: [],
  });
  
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedPhotos: string[] = [];
  
      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", UPLOAD_PRESET);
  
        try {
          const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: uploadData,
          });
  
          if (!response.ok) {
            throw new Error("Failed to upload image.");
          }
  
          const data = await response.json();
          uploadedPhotos.push(data.secure_url);
        } catch (error) {
          console.error("Error uploading image:", error);
          setErrorMessage("Upload error: " + (error instanceof Error ? error.message : "Unknown error"));
        }
      }
  
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...uploadedPhotos],
      }));
      setErrorMessage("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const propertyData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("http://localhost:3001/properties", {
        method: "POST",
        body: propertyData,
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la propiedad');
      }
  
      const data = await response.json();
      console.log('Property created:', data);
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Crear Propiedad</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-800 text-lg">Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Provincia:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Ciudad:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Habitaciones:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Baños:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">¿Está disponible?</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Capacidad:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Calle:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Número:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Código Postal:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Fotos:</label>
          <input
            name="photos"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="mt-2">
            {formData.photos.map((uploadedPhotos, index) => (
              <img key={index} src={uploadedPhotos} alt={`Foto ${index + 1}`} className="w-24 h-24 object-cover mb-2" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-black focus:outline-none focus:ring-2 transition"
        >
          Crear Propiedad
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;