import * as React from 'react';

export default ({ className = '' }: { className?: string }) => (
  <svg className={`pw-icon ${className}`} viewBox="0 0 24 24">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z" />
      <path d="M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z" />
    </g>
  </svg>
);
