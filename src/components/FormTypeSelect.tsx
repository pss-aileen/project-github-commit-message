import React from 'react';
import FormTypeOption from './FormTypeOption';

export default function FormTypeSelect({ selectedTypeId, onUpdate, data }) {
  return (
    <select name='type' id='type' value={selectedTypeId} onChange={(e) => onUpdate(parseInt(e.target.value))}>
      {data.map((data) => {
        return <FormTypeOption key={data.id} id={data.id} emoji={data.emoji} displayName={data.displayName} />;
      })}
    </select>
  );
}
