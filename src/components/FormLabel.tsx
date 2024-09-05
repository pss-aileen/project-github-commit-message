import React from 'react';

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export default function FormLabel({ htmlFor, children }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className='text-lg font-bold block'>
      {children}
    </label>
  );
}
