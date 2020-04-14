import * as React from 'react';

export default ({ className = '' }: { className?: string }) => (
  <svg className={`pw-icon ${className}`} viewBox="0 0 24 24">
    <path
      d="M10 5v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
