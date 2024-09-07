import React from 'react';

export default function FormSummaryInput({ summary, setSummary }) {
  return <input type='text' id='summary' name='summary' placeholder='add xxx at README' autoComplete='off' onChange={(e) => setSummary(e.target.value)} value={summary} />;
}
