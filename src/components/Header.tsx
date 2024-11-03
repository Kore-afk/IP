import React from 'react';
import { Globe2 } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Globe2 className="w-10 h-10 text-blue-300" />
        <h1 className="text-3xl font-bold">¿Mi IP? by Angel</h1>
      </div>
      <p className="text-gray-300">
        Descubre tu ubicacion exacta.
      </p>
    </header>
  );
}