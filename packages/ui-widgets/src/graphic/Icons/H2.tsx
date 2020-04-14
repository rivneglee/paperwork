import * as React from 'react';

export default ({ className = '' }: { className?: string }) => (
  <svg className={`pw-icon ${className}`} viewBox="0 0 24 24">
    <path d="M5 5v3h5v11h3V8h5V5z" fill="currentColor" fillRule="evenodd" />
  </svg>
);
