import FormPrefixOption from './FormPrefixOption';

interface FormPrefixSelectProps {
  data: {
    id: number;
    emoji: string;
    prefixText: string;
    description: string;
  }[];
  onUpdate: (newId: number) => void;
  selectedPrefixId: number;
}

export default function FormPrefixSelect({ data, onUpdate, selectedPrefixId }: FormPrefixSelectProps) {
  return (
    <select size={4} value={selectedPrefixId} onChange={(e) => onUpdate(parseInt(e.target.value))} id='prefix'>
      {data.map((data) => {
        return <FormPrefixOption key={data.id} id={data.id} emoji={data.emoji} prefixText={data.prefixText} description={data.description} />;
      })}
    </select>
  );
}
