import { format } from 'date-fns';

interface DateProps {
  value?: string;
}

export function Date({ value }: DateProps) {
  const formatted = value ? format(value, "yyyy. MM. dd. HH:mm") : ''
  return (
    <>
      <span>{formatted}</span>
    </>
  );
}
