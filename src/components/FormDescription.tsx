import React from 'react';

interface FormDescriptionProps {
  children: React.ReactNode;
}

export default function FormDescription({ children }: FormDescriptionProps) {
  return <p className='mt-2 text-xs opacity-80'>💡 {children}</p>;
}
