import React from "react";

interface inputFieldProps {
  label: string;
  type: string;
  name?: string;
  id?: string;
  required?: boolean
}

const InputField: React.FC<inputFieldProps> = ({ label, type, name, id }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="w-full p-2 border rounded"
        required
      />
    </div>
  );
};

export default InputField;
