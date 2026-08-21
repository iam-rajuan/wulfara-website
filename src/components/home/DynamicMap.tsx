"use client";

import React, { useEffect, useMemo, useRef } from "react";
import type { Supplier } from "@/types/api";

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

export default function DynamicMap({ suppliers = [] }: { suppliers?: Supplier[] }): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  // Map real suppliers to map nodes
  const nodesToRender = useMemo(
    () =>
      suppliers
        .filter(
          (supplier) =>
            supplier.location?.coordinates &&
            supplier.location.coordinates.length === 2 &&
            (supplier.location.coordinates[0] !== 0 || supplier.location.coordinates[1] !== 0)
        )
        .map((supplier) => ({
          name: supplier.companyName || "Supplier",
          pos: {
            lat: supplier.location!.coordinates![1],
            lng: supplier.location!.coordinates![0],
          } satisfies LatLng,
        })),
    [suppliers]
  );

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      // Center map based on nodes, or default to world view
      const defaultCenter = nodesToRender.length > 0 
        ? nodesToRender[0].pos 
        : { lat: 25, lng: 10 };

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: nodesToRender.length > 0 ? 4 : 2,
        disableDefaultUI: false,
        zoomControl: true,
        minZoom: 1.5,
        maxZoom: 6
      });

      // Add Glowing Node Markers
      nodesToRender.forEach((node) => {
        new window.google.maps.Marker({
          position: node.pos,
          map: map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#EA4335",
            fillOpacity: 1,
            strokeColor: "#EA4335",
            strokeOpacity: 0.35,
            strokeWeight: 6,
            scale: 5
          },
          title: node.name
        });
      });

      // Add Connection Lines (only if we have more than 1 node)
      if (nodesToRender.length > 1) {
        for (let i = 0; i < nodesToRender.length - 1; i++) {
          new window.google.maps.Polyline({
            path: [nodesToRender[i].pos, nodesToRender[i + 1].pos],
            geodesic: true,
            strokeColor: "#4285F4",
            strokeOpacity: 0.5,
            strokeWeight: 1.5,
            map: map
          });
        }
      }
    };

    if (window.google) {
      initMap();
    } else {
      const scriptId = "google-maps-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener("load", initMap);

      return () => {
        script.removeEventListener("load", initMap);
      };
    }
  }, [nodesToRender]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[300px] bg-slate-100" 
    />
  );
}
