import React, { useState } from "react";

const AditiTest = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        course: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you can handle form submission, e.g., send data to API
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: "2rem auto",
            padding: 24,
            border: "2px solid #1976d2",
            borderRadius: 12,
            background: "#e3f2fd",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)"
        }}>
            <h2 style={{ color: "#1565c0", textAlign: "center", marginBottom: 24 }}>Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: "#1976d2", fontWeight: 500 }}>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: 8, border: "1px solid #90caf9", borderRadius: 4, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: "#1976d2", fontWeight: 500 }}>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: 8, border: "1px solid #90caf9", borderRadius: 4, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: "#1976d2", fontWeight: 500 }}>
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            required
                            min="1"
                            style={{ width: "100%", padding: 8, border: "1px solid #90caf9", borderRadius: 4, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: "#1976d2", fontWeight: 500 }}>
                        Gender:
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: 8, border: "1px solid #90caf9", borderRadius: 4, marginTop: 4 }}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ color: "#1976d2", fontWeight: 500 }}>
                        Course:
                        <input
                            type="text"
                            name="course"
                            value={form.course}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: 8, border: "1px solid #90caf9", borderRadius: 4, marginTop: 4 }}
                        />
                    </label>
                </div>
                <button type="submit" style={{
                    padding: "10px 24px",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(25, 118, 210, 0.10)"
                }}>Register</button>
            </form>
            {submitted && (
                <div style={{ marginTop: 24, color: "#1565c0", fontWeight: 600, textAlign: "center" }}>
                    Registration successful!
                </div>
            )}
        </div>
    );
};

export default AditiTest;