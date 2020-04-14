import * as React from 'react';

export default ({ className = '' }: { className?: string }) => (
  <svg className={`pw-icon ${className}`} viewBox="0 0 24 24">
    <path
      d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
