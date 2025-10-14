import React from 'react';

interface SecurityBadgesProps {
  className?: string;
}

export default function SecurityBadges({ className = "" }: SecurityBadgesProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-gray-500">
        🔒 Secure • POPIA Compliant • HIPAA Aligned
      </p>
    </div>
  );
}