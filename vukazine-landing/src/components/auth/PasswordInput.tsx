import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  showValidation?: boolean;
  isValid?: boolean;
  error?: string;
  className?: string;
}

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleVisibility,
  showValidation = false,
  isValid = false,
  error,
  className = ""
}: PasswordInputProps) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {showValidation && isValid && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400">
            ✓
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}