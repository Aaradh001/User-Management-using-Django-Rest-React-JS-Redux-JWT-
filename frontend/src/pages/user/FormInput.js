import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocussed] = useState(false)
  const { label, onChange, keyId, error, ...inputProps } = props;

  const handleFocus = ()=> {
     setFocussed(true);
  };

  return (
    <div className=" mb-4">
      <label
        htmlFor={inputProps.id}
        className="form-label fw-bold text-dark-subtle"
      >
        {label}
      </label>

      <input className="input-element" {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
      <span className="span-error p-2">{error}</span>
    </div>
  );
};

export default FormInput;
