import React from 'react';

interface FormPrefixOptionProps {
  id: number;
  emoji: string;
  prefixText: string;
  description: string;
}

export default function FormPrefixOption({ id, emoji, prefixText, description }: FormPrefixOptionProps) {
  return (
    <option value={id} key={id}>
      {emoji} {prefixText}: {description}
    </option>
  );
}
