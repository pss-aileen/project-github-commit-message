import React from 'react';

export default function FormTypeOption({ id, emoji, displayName }) {
  return (
    <option value={id} key={id}>
      {emoji} {displayName}
    </option>
  );
}
