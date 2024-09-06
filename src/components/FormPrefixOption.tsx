import React from 'react';

export default function FormPrefixOption({ id, selected, emoji, prefixText, description }) {
  return (
    <option value={id} key={id} selected={selected}>
      {emoji} {prefixText}: {description}
    </option>
  );
}
