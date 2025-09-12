import React, { useState } from "react";

function CRMForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.email || !form.phone) {
      setError(new Error("All fields are required."));
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError(new Error("Invalid email address."));
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError(new Error("Phone number must be 10 digits."));
      return;
    }
    alert("Form submitted successfully!");
    setForm({ name: "", email: "", phone: "" });
  };

  if (error) throw error;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>CRM Form</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Name:</label><br />
        <input name="name" value={form.name} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email:</label><br />
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Phone:</label><br />
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CRMForm;
