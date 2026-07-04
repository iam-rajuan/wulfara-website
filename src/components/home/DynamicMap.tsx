"use client";

import React, { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
  }
}

interface LatLng {
  lat: number;
  lng: number;
}

interface MapNode {
  name: string;
  pos: LatLng;
}

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0b1322" }]
  },
  {
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1c3247" }, { weight: 1.2 }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#11202e" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#070c14" }]
  }
];

const nodes: MapNode[] = [
  { name: "New York", pos: { lat: 40.7128, lng: -74.0060 } },
  { name: "Los Angeles", pos: { lat: 34.0522, lng: -118.2437 } },
  { name: "London", pos: { lat: 51.5074, lng: -0.1278 } },
  { name: "Amsterdam", pos: { lat: 52.3676, lng: 4.9041 } },
  { name: "Cairo", pos: { lat: 30.0444, lng: 31.2357 } },
  { name: "Dubai", pos: { lat: 25.2048, lng: 55.2708 } },
  { name: "Shanghai", pos: { lat: 31.2304, lng: 121.4737 } },
  { name: "Tokyo", pos: { lat: 35.6762, lng: 139.6503 } },
  { name: "Sydney", pos: { lat: -33.8688, lng: 151.2093 } },
  { name: "Sao Paulo", pos: { lat: -23.5505, lng: -46.6333 } }
];

const connections: LatLng[][] = [
  [nodes[0].pos, nodes[2].pos], // NY - London
  [nodes[1].pos, nodes[7].pos], // LA - Tokyo
  [nodes[2].pos, nodes[3].pos], // London - Amsterdam
  [nodes[3].pos, nodes[4].pos], // Amsterdam - Cairo
  [nodes[4].pos, nodes[5].pos], // Cairo - Dubai
  [nodes[5].pos, nodes[6].pos], // Dubai - Shanghai
  [nodes[6].pos, nodes[7].pos], // Shanghai - Tokyo
  [nodes[7].pos, nodes[8].pos], // Tokyo - Sydney
  [nodes[0].pos, nodes[9].pos], // NY - Sao Paulo
  [nodes[9].pos, nodes[8].pos]  // Sao Paulo - Sydney
];

export default function DynamicMap(): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25, lng: 10 },
        zoom: 2,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: false,
        backgroundColor: "#0b1322",
        minZoom: 1.5,
        maxZoom: 6
      });

      // Add Glowing Node Markers
      nodes.forEach((node) => {
        new window.google.maps.Marker({
          position: node.pos,
          map: map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#00f0ff",
            fillOpacity: 1,
            strokeColor: "#00f0ff",
            strokeOpacity: 0.35,
            strokeWeight: 6,
            scale: 5
          },
          title: node.name
        });
      });

      // Add Connection Lines
      connections.forEach((path) => {
        new window.google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: "#00f0ff",
          strokeOpacity: 0.5,
          strokeWeight: 1.5,
          map: map
        });
      });
    };

    if (window.google) {
      initMap();
    } else {
      const scriptId = "google-maps-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDummyKey_MgirmayeMap2026`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener("load", initMap);

      return () => {
        script.removeEventListener("load", initMap);
      };
    }
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[300px]" 
      style={{ background: "#0b1322" }}
    />
  );
}
