import { useState, useEffect } from "react";

export default function UseForm({
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
  isEditMode = false, // Flag to check if it's in edit mode
}) {
  const [formValues, setFormValues] = useState(initialValues);

  // Jika form dalam mode edit, kita akan memperbarui formValues
  useEffect(() => {
    if (isEditMode) {
      setFormValues(initialValues); // Memastikan form diisi dengan data yang benar saat edit
    }
  }, [isEditMode, initialValues]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formValues).map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type={key === "email" ? "email" : "text"}
            name={key}
            value={formValues[key]}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
      ))}
      <button
        type="submit"
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
