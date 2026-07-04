import type { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
};

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <select {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
