import React from 'react';

type ButtonType = 'generate' | 'copy' | 'reset';

interface FormButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FormButton({ type, children, onClick }: FormButtonProps) {
  let className = '';

  const commonButtonCSS = 'block rounded-md text-lg px-1 tracking-widest select-none hover:opacity-70 active:translate-y-0.5 transition';

  const coloreButtonBase = 'py-2 w-full text-neutral-50 shadow-lg active:shadow-md';

  switch (type) {
    case 'generate':
      className = `${commonButtonCSS} ${coloreButtonBase} bg-pink-600 shadow-pink-600/50 active:shadow-pink-600/50`;
      break;
    case 'copy':
      className = `${commonButtonCSS} ${coloreButtonBase} bg-purple-600 shadow-purple-600/50 active:shadow-purple-600/50`;
      break;
    case 'reset':
      className = `${commonButtonCSS} py-1 w-1/4 border-2 border-solid border-gray-300 bg-gray-100`;
      break;
    default:
      break;
  }
  return (
    <button className={className} id='btn-generate' type='button' onClick={onClick}>
      {children}
    </button>
  );
}
