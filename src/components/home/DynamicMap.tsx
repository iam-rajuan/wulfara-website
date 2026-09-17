"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Supplier } from "@/types/api";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void;
  }
}

interface LatLng {
  lat: number;
  lng: number;
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

export default function DynamicMap({ suppliers = [] }: { suppliers?: Supplier[] }): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapUnavailable, setMapUnavailable] = useState(!googleMapsApiKey);

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
          address: supplier.location?.formattedAddress || supplier.address || "Location available",
          pos: {
            lat: supplier.location!.coordinates![1],
            lng: supplier.location!.coordinates![0],
          } satisfies LatLng,
        })),
    [suppliers]
  );

  useEffect(() => {
    if (!googleMapsApiKey) {
      return;
    }

    const initMap = () => {
      if (!mapRef.current || !window.google || mapUnavailable) return;

      try {
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
      } catch (error) {
        console.warn("Google Maps failed to initialize.", error);
        setMapUnavailable(true);
      }
    };

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      previousAuthFailure?.();
      setMapUnavailable(true);
    };
    const handleScriptError = () => setMapUnavailable(true);

    if (window.google) {
      initMap();
    } else {
      const scriptId = "google-maps-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener("load", initMap);
      script.addEventListener("error", handleScriptError);

      return () => {
        script.removeEventListener("load", initMap);
        script.removeEventListener("error", handleScriptError);
        window.gm_authFailure = previousAuthFailure;
      };
    }
    
    return () => {
      window.gm_authFailure = previousAuthFailure;
    };
  }, [mapUnavailable, nodesToRender]);

  if (mapUnavailable) {
    return (
      <div className="flex h-full min-h-[300px] w-full flex-col justify-between bg-slate-100 p-4">
        <div>
          <p className="text-sm font-bold text-slate-900">Map unavailable</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Supplier locations are still listed below.
          </p>
        </div>

        <div className="mt-4 space-y-2 overflow-y-auto pr-1">
          {nodesToRender.length > 0 ? (
            nodesToRender.slice(0, 8).map((node) => (
              <div key={`${node.name}-${node.pos.lat}-${node.pos.lng}`} className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-bold text-slate-900">{node.name}</p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">{node.address}</p>
              </div>
            ))
          ) : (
            <div className="rounded-md border border-slate-200 bg-white p-3 text-xs font-medium text-slate-500 shadow-sm">
              No mapped supplier coordinates yet.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[300px] bg-slate-100" 
    />
  );
}
