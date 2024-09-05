import React from 'react';

interface FormItemProps {
  children: React.ReactNode;
}

export default function FormItem({ children }: FormItemProps) {
  return <div className='mt-5'>{children}</div>;
}
