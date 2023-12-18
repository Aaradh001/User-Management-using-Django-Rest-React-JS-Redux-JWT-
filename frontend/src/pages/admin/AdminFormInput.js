import React, { useState } from "react";

const AdminFormInput = (props) => {
  const [focused, setFocussed] = useState(false);
  const { label, onChange, error, keyId, ...inputProps } = props;

  const handleFocus = () => {
    setFocussed(true);
  };
  if (keyId === 3 || keyId === 4) {
    return (
      <div className="col-xl-10 col-md-12 col-12">
        <div className=" mb-4">
          <label
            htmlFor={inputProps.id}
            className="form-label fw-bold text-dark-subtle"
          >
            {label}
          </label>

          <input
            className="input-element"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="span-error p-2">{error}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-xl-5 col-md-12 col-12">
        <div className=" mb-4">
          <label
            htmlFor={inputProps.id}
            className="form-label fw-bold text-dark-subtle"
          >
            {label}
          </label>

          <input
            className="input-element"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span className="span-error p-2">{error}</span>
        </div>
      </div>
    );
  }
};

export default AdminFormInput;
