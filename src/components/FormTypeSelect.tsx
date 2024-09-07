
import FormTypeOption from './FormTypeOption';

interface FormTypeSelectProps {
  data: {
    id: number;
    emoji: string;
    displayName: string;
  }[];
  onUpdate: (newId: number) => void;
  selectedTypeId: string;
}

export default function FormTypeSelect({ selectedTypeId, onUpdate, data }: FormTypeSelectProps) {
  return (
    <select name='type' id='type' value={selectedTypeId} onChange={(e) => onUpdate(parseInt(e.target.value))}>
      {data.map((data) => {
        return <FormTypeOption key={data.id} id={data.id} emoji={data.emoji} displayName={data.displayName} />;
      })}
    </select>
  );
}
