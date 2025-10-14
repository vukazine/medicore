import React from 'react';
import Image from 'next/image';

interface AuthLogoProps {
  className?: string;
}

export default function AuthLogo({ className = "h-10 w-auto" }: AuthLogoProps) {
  return (
    <div className="flex justify-center">
      <Image
        src="/image/logos/vukazine.png"
        alt="Vukazine"
        width={160}
        height={40}
        className={className}
        priority
      />
    </div>
  );
}