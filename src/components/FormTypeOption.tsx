interface FormTypeOptionProps {
  id: number;
  emoji: string;
  displayName: string;
}

export default function FormTypeOption({ id, emoji, displayName }: FormTypeOptionProps) {
  return (
    <option value={id} key={id}>
      {emoji} {displayName}
    </option>
  );
}
