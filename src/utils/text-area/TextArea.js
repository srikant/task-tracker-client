import React from "react";
import "./TextArea.scss";
const TextArea = (props) => {
  const { placeholder, label, defaultValue } = props;
  return (
    <div className="text-area-container">
      <label htmlFor="">{label}</label>
      <textarea
        id="text-area"
        className="text-area"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(event) => props.handleTextArea(event)}
      />
    </div>
  );
};

export default TextArea;
