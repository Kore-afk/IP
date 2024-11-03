import React from 'react';
import { MapPin, Clock, Globe, AlertCircle, Wifi, Locate } from 'lucide-react';

interface LocationData {
  city: string;
  country: string;
  timezone: string;
  lat: number;
  lon: number;
  localTime: string;
  region: string;
  isp: string;
  ipVersion: number;
}

interface LocationInfoProps {
  loading: boolean;
  data: LocationData | null;
  error: string | null;
}

export function LocationInfo({ loading, data, error }: LocationInfoProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-white/5 rounded mb-4 w-24"></div>
            <div className="h-8 bg-white/5 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center gap-2 text-red-300">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const locationCards = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Localización",
      value: `${data.city}, ${data.region}`,
      subValue: data.country
    },
    {
      icon: <Locate className="w-5 h-5" />,
      title: "Coordenadas",
      value: `${data.lat.toFixed(6)}°->Latitud`,
      subValue: `${data.lon.toFixed(6)}°->Longitud`
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Tiempo",
      value: `${data.localTime}`,
      subValue: `Zona horaria: ${data.timezone}`
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: "Conexión",
      value: data.isp,
      subValue: `IPv${data.ipVersion}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {locationCards.map((card, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-blue-300">
            {card.icon}
            <h3 className="font-semibold">{card.title}</h3>
          </div>
          <p className="text-lg font-medium">{card.value}</p>
          <p className="text-sm text-gray-400">{card.subValue}</p>
        </div>
      ))}
    </div>
  );
}