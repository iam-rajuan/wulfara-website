"use client";

import React, { useState } from "react";
import { Factory as FactoryIcon, Settings, Wrench } from "lucide-react";

export default function ServiceTypeGrid() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "contract",
      title: "Contract Manufacturing",
      icon: <FactoryIcon size={18} />,
      desc: "Outsource your entire production process to specialized facilities with scalable capacity.",
      img: "https://images.unsplash.com/photo-1565514120036-c65691d575c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "assembly",
      title: "Assembly Services",
      icon: <Settings size={18} />,
      desc: "Manual and automated assembly lines for sub-assemblies and final product completion.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "fabrication",
      title: "Product Fabrication",
      icon: <Wrench size={18} />,
      desc: "Sheet metal fabrication, welding, machining, and custom structural component creation.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1b2b3a] mb-3 font-serif">Choose Manufacturing Service Type</h2>
          <p className="text-sm text-slate-500">Select a specific manufacturing discipline to narrow your supplier search.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(svc => (
            <div key={svc.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    {svc.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{svc.title}</h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">{svc.desc}</p>
                <button 
                  onClick={() => setSelectedService(svc.id)}
                  className={`w-full py-2.5 rounded text-sm font-bold transition-colors ${
                    selectedService === svc.id 
                      ? 'bg-[#1b2b3a] text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {selectedService === svc.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
