import { useEffect, useRef } from 'react';
import mapboxgl, { IControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYTBmZmlzIiwiYSI6ImNtNGpsYnl3ODBjNHAycXNsYzB2eTdqc3oifQ.KWwTfX0c4F_8ex32UIkqiQ';

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // Use a valid style
        center: [100.523186, 13.736717], // Thailand coordinates
        zoom: 14,
        language: 'th',
      });

      mapInstance.current = map;

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        countries: 'th',
        placeholder: 'Search for places in Thailand',
      }) as IControl & MapboxGeocoder;

      const geocoderContainer = document.createElement('div');
      geocoderContainer.classList.add('geocoder-container');
      geocoderContainer.appendChild(geocoder.onAdd(map));

      geocoder.on('result', (event) => {
        const [lng, lat] = event.result.center;

        if (markerRef.current) {
          markerRef.current.remove();
        }
        console.log('event >>>', event);
        markerRef.current = new mapboxgl.Marker({ color: 'green' })
          .setLngLat([lng, lat])
          .addTo(mapInstance.current!);
      });

      mapInstance.current.addControl(
        {
          onAdd: () => geocoderContainer,
          onRemove: () => geocoder.onRemove,
        },
        'top-left',
      );

      mapInstance.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true,
        }),
        'bottom-right',
      );

      mapInstance.current.addControl(
        new mapboxgl.FullscreenControl({
          container: document.querySelector('body'),
        }),
        'bottom-right',
      );

      mapInstance.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
      );

      return () => mapInstance.current?.remove();
    }
  }, []);

  // if (!mapInstance.current) {
  //   return null;
  // }

  const flyTo = (location: { lat: number; lng: number }) => {
    mapInstance.current?.flyTo({
      center: [location.lng, location.lat],
      zoom: 14,
    });
  };

  return (
    <div
      ref={mapContainer}
      style={{ height: '100dvh' }} // Adjust size as needed
    />
  );
};

export default Map;
