


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const VirtualKeycard: React.FC = () => {
  const { user } = useAuth();
  const [totpToken, setTotpToken] = useState('843 921');
  const [timeLeft, setTimeLeft] = useState(30);

  // Simulate a rolling secure token (similar to TOTP)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Generate new mock token
          setTotpToken(Math.floor(100000 + Math.random() * 900000).toString().replace(/(\d{3})(\d{3})/, '$1 $2'));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">Secure Workplace Access</span>
          <h3 className="text-lg font-bold mt-1">Virtual Keycard</h3>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ● Active Session
        </span>
      </div>

      <div className="flex flex-col items-center my-6">
        {/* Placeholder for QR Code Graphics */}
        <div className="bg-white p-3 rounded-xl mb-4 border-2 border-indigo-500/30">
          <div className="w-32 h-32 bg-slate-100 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded">
            {/* Simple CSS-rendered barcode representation */}
            <div className="flex space-x-1.5 h-16 items-center">
              {[1.5, 3, 1, 4, 1.5, 2, 3, 1, 4, 2].map((w, i) => (
                <div key={i} className="bg-slate-900 rounded-sm" style={{ width: `${w * 2}px`, height: '100%' }} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-gray-500 mt-2">SECURE-NFC-PASS</span>
          </div>
        </div>

        <div className="text-center">
          <span className="text-2xl font-mono tracking-widest font-bold text-indigo-200">{totpToken}</span>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            Rotates in {timeLeft}s
          </p>
        </div>
      </div>

      <div className="border-t border-indigo-500/20 pt-4 mt-4">
        <div className="flex justify-between text-xs text-indigo-200">
          <span>Cardholder:</span>
          <span className="font-semibold text-white">{user?.name}</span>
        </div>
        <div className="flex justify-between text-xs text-indigo-200 mt-1">
          <span>Employee ID:</span>
          <span className="font-semibold text-white">EMP-294-A</span>
        </div>
      </div>
    </div>
  );
};