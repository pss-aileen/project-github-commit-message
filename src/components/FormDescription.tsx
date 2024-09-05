import React from 'react';

interface FormDescriptionProps {
  children: React.ReactNode;
}

export default function FormDescription({ children }: FormDescriptionProps) {
  return <p className='mt-2 text-sm opacity-60'>💡 {children}</p>;
}
