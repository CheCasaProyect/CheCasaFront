"use client";
import React, { useState, useEffect } from 'react';
import CardAccommodation from './accommodations/CardAccommodation';
import FilterProperties from '@/components/Filterproperty';


export default function Home() {
  return (
    <>
    <div>
      <FilterProperties/>
    </div>
  </>
  );
}
