"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

interface DatePickerProps {
  onCheckInChange: (date: string | null) => void;
  onCheckOutChange: (date: string | null) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ onCheckInChange, onCheckOutChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onCheckInChange(date ? date.toISOString() : null); 
    if (date && endDate && date > endDate) {
      setEndDate(null); 
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onCheckOutChange(date ? date.toISOString() : null); 
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check In</label>
          <DatePicker
            selected={startDate ?? undefined}  
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={new Date()}
            className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Selecciona una fecha"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check Out</label>
          <DatePicker
            selected={endDate ?? undefined} 
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={startDate ? addDays(startDate, 1) : new Date()}
            className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Selecciona una fecha"
          />
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default DatePickerComponent;
