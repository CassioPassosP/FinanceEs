import React from "react";

const Form = ({ children, onSubmit, className = "" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  );
};

export default Form;
