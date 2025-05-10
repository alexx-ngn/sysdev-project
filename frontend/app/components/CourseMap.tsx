'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/language-context';

interface CourseMapProps {
  geojsonPath?: string; // Path to the GeoJSON file
  zoom?: number;
}

interface MapPoint {
  lat: number;
  lng: number;
}

export default function CourseMap({ 
  geojsonPath = '/maps/charity-run-route.json',
  zoom = 13,
}: CourseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Function to load GeoJSON data
    const loadGeoJSON = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(geojsonPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status} ${response.statusText}`);
        }
        
        const geojsonData = await response.json();
        
        // Extract the coordinates from the LineString geometry
        if (geojsonData?.features?.[0]?.geometry?.type === 'LineString') {
          const coordinates = geojsonData.features[0].geometry.coordinates;
          
          // Convert coordinates to path format (from [lng, lat] to {lat, lng})
          const path = coordinates.map(([lng, lat]: [number, number]): MapPoint => ({ lat, lng }));
          
          // Calculate center based on the average of all coordinates
          const center = path.reduce(
            (acc, point) => ({
              lat: acc.lat + point.lat / path.length,
              lng: acc.lng + point.lng / path.length,
            }),
            { lat: 0, lng: 0 }
          );
          
          // Now load the map with the calculated center and path
          loadMap(center, path);
          
          // Extract markers for start/end points if they exist in the GeoJSON
          const markers: MapPoint[] = [];
          
          // Look for Point geometries in the GeoJSON features
          geojsonData.features.forEach((feature: any) => {
            if (feature.geometry.type === 'Point') {
              const [lng, lat] = feature.geometry.coordinates;
              markers.push({ 
                lat, 
                lng,
                name: feature.properties.name || ''
              });
            }
          });
          
          // If no specific markers found, use first and last points of the path
          if (markers.length === 0 && path.length > 1) {
            markers.push({
              ...path[0],
              name: 'Start'
            });
            markers.push({
              ...path[path.length - 1],
              name: 'End'
            });
          }
          
          // Add markers to the map
          addMarkers(markers);
        } else {
          throw new Error('GeoJSON data does not contain a LineString geometry');
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map data');
        setIsLoading(false);
      }
    };
    
    // Function to load the map with path and center
    const loadMap = (center: MapPoint, path: MapPoint[]) => {
      // Load OpenStreetMap
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        const L = (window as any).L;
        const map = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
          dragging: true,
          attributionControl: false
        }).setView([center.lat, center.lng], zoom);
        
        // Use Carto Light tiles for a Google Maps-like appearance
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add the course path if provided
        if (path.length > 0) {
          L.polyline(path.map(point => [point.lat, point.lng]), {
            color: '#2563eb',
            weight: 4,
            opacity: 0.8,
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(map);

          // Always add green marker at start and red marker at end
          const startIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          const endIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          L.marker([path[0].lat, path[0].lng], { icon: startIcon })
            .addTo(map)
            .bindPopup('<b>CHU Sainte-Justine</b><br>3175 Chem. de la Côte-Sainte-Catherine,<br>Montréal, QC H3T 1C5');
          L.marker([path[path.length - 1].lat, path[path.length - 1].lng], { icon: endIcon })
            .addTo(map)
            .bindPopup("<b>Montreal Children's Hospital</b><br>1001 Decarie Blvd,<br>Montreal, Quebec H4A 3H9");
        }
        
        // Store the map in a window variable for the addMarkers function to use
        (window as any).courseMap = map;
        (window as any).L = L;
      };
      document.head.appendChild(script);

      // Add Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(script);
        document.head.removeChild(link);
      };
    };
    
    // Function to add markers to the map
    const addMarkers = (markers: Array<MapPoint & { name?: string }>) => {
      if (!(window as any).courseMap || !(window as any).L) return;
      
      const L = (window as any).L;
      const map = (window as any).courseMap;
      
      markers.forEach((marker, index) => {
        // Determine if this is start (first) or end (last) marker
        const isStart = index === 0;
        const isEnd = index === markers.length - 1;
        
        // Create custom marker icon
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${isStart ? '#22c55e' : '#ef4444'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        
        // Add marker to map
        const markerObj = L.marker([marker.lat, marker.lng], { icon }).addTo(map);
        
        // Add popup with marker name if available
        if (marker.name) {
          markerObj.bindPopup(marker.name);
        }
      });
    };
    
    // Start loading GeoJSON
    loadGeoJSON();
  }, [geojsonPath, zoom]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
          <div className="text-red-500 text-center px-4">{error}</div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 