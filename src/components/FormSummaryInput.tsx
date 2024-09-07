interface FormSummaryInputProps {
  summary: string;
  setSummary: (value: string) => void;
}

export default function FormSummaryInput({ summary, setSummary }: FormSummaryInputProps) {
  return <input type='text' id='summary' name='summary' placeholder='add xxx at README' autoComplete='off' onChange={(e) => setSummary(e.target.value)} value={summary} />;
}
