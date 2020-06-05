/* tslint:disable:max-line-length */
import * as React from 'react';

export default ({ className = '' }: { className?: string }) => (
  <svg className={`pw-icon ${className}`} viewBox="0 0 1070 1024">
    <path
      d="M576 320h-512v384h512V768H768v-64h192v-384H768V256h-192v64zM64 256h896A64 64 0 0 1 1024 320v384a64 64 0 0 1-64 64h-896A64 64 0 0 1 0 704v-384A64 64 0 0 1 64 256zM640 128h64v704H640V128z m-128 0h320v64H512V128z m0 704h320V896H512v-64z"
    ></path>
  </svg>
);
