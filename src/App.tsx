import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { IPDisplay } from './components/IPDisplay';
import { LocationInfo } from './components/LocationInfo';
import { SearchForm } from './components/SearchForm';
import { getIPAddress, getLocationData } from './services/ipService';

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

function App() {
  const [ip, setIp] = useState<string>('Loading...');
  const [copied, setCopied] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (searchIp?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const ipAddress = searchIp || await getIPAddress();
      setIp(ipAddress);
      
      const location = await getLocationData(ipAddress);
      setLocationData(location);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al obtener la información');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (searchIp: string) => {
    if (searchIp) {
      fetchData(searchIp);
    } else {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
          
          <IPDisplay 
            ip={ip} 
            copied={copied} 
            onCopy={copyToClipboard} 
          />
          
          <LocationInfo 
            loading={loading}
            data={locationData}
            error={error}
          />

          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">¿Qué es una dirección IP?</h3>
            <p className="text-sm text-gray-300">
              La dirección IP es una etiqueta numérica que se asigna a los dispositivos conectados a una red. Es importante mantener su privacidad y no compartir información personal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;