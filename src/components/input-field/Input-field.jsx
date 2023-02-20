import React from "react";
import "./Input-field.css";

const InputField = ({
  onChange,
  defaultValue,
  value,
  placeholder,
  onFocus,
  type,
}) => {
  return (
    <input
      className="input-box"
      type={type}
      onChange={onChange}
      defaultValue={defaultValue}
      onFocus={onFocus}
      placeholder={placeholder}
      value={value}
      autoComplete="off"
    />
  );
};

export default InputField;
