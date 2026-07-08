




import React from 'react';

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
  const evaluateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = evaluateStrength(password);
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Password Strength</span>
        <span>{password ? labels[strength - 1] || 'Weak' : 'None'}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex gap-1">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 transition-all duration-300 ${
              index <= strength ? colors[strength - 1] : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};