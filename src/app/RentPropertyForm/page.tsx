"use client";
import IFormData from '@/interfaces/FormData';
import React, { useState, useEffect } from 'react';
import { string } from 'yup';

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
          console.log(data);
          uploadedPhotos.push(data.secure_url);
          console.log(data.secure_url)
        } catch (error) {
          console.error("Error uploading image:", error);
          setErrorMessage("Upload error: " + (error instanceof Error ? error.message : "Unknown error"));
        }
      }
  
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...uploadedPhotos],
      }));
      console.log("Photos after update:", formData.photos)
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
    const updata = Object.fromEntries(propertyData);
    

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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-black">Crear Propiedad</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Título:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Estado:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Ciudad:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Habitaciones:</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Baños:</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">¿Está disponible?</label>
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
          className="ml-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Capacidad:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fotos:</label>
        <input
          name='photos'
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple // Permite la selección de múltiples archivos
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        Muestra las fotos subidas
        <div className="mt-2">
          {formData.photos.map((uploadedPhotos, index) => (
           <img key={index} src={uploadedPhotos} alt={`Foto ${index + 1}`} className="w-24 h-24 object-cover mb-2" />
          ))}
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Crear Propiedad
      </button>
    </form>
  );
};

export default PropertyForm;
