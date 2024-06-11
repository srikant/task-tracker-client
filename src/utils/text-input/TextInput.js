import React from "react";
import "./TextInput.scss";
const TextInput = (props) => {
  const { placeholder, label, defaultValue } = props;
  return (
    <div className="text-input-container">
      <label htmlFor="text-input" className="label">
        {label}
      </label>
      <input
        id="text-input"
        className="text-input"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(event) => props.handleTextInput(event)}
      />
    </div>
  );
};

export default TextInput;
