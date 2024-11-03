import React from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface IPDisplayProps {
  ip: string;
  copied: boolean;
  onCopy: () => void;
}

export function IPDisplay({ ip, copied, onCopy }: IPDisplayProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3">
        <code className="text-2xl font-mono bg-black/20 px-4 py-2 rounded-lg flex-1">
          {ip}
        </code>
        <button
          onClick={onCopy}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          title="Copy IP address"
        >
          {copied ? (
            <CheckCircle2 className="w-5 h-5 text-green-300" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}