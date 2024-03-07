import React from "react";

interface SelectProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
