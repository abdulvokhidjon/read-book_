"use client";
import React from "react";

function FormInput({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </label>
  );
}

export default FormInput;
