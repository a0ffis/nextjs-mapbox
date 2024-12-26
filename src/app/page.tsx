'use client';
import Image from 'next/image';
import Map from '../../components/map/Map';
import MapWithGeocoder from '../../components/map/MapWithGeocoder';
import { SearchBox } from '@mapbox/search-js-react';

export default function Home() {
  return (
    <div className=''>
      <MapWithGeocoder />
    </div>
  );
}
