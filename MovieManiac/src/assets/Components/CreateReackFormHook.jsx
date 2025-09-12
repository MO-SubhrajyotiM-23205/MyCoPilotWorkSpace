
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }).min(5, { message: "Name must be at least 5 characters" }),
    email: z.string().email("Invalid email address"),
    phone: z.string().nonempty("Phone is required"),
    dob: z.string().nonempty("Date of Birth is required"),
    course: z.string().nonempty("Course is required"),
});

const CreateReackFormHook = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, watch } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        // You can add API call here
        console.log("Form submitted:", data);
        reset();
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Student Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name:<br />
                    <input type="text" {...register("name")} />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
                </label><br /><br />
                <label>Email:<br />
                    <input type="email" {...register("email")} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                </label><br /><br />
                <label>Phone:<br />
                    <input type="tel" {...register("phone")} />
                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
                </label><br /><br />
                <label>Date of Birth:<br />
                    <input type="date" {...register("dob")} />
                    {errors.dob && <span style={{ color: 'red' }}>{errors.dob.message}</span>}
                </label><br /><br />
                <label>Course:<br />
                    <input type="text" {...register("course")} />
                    {errors.course && <span style={{ color: 'red' }}>{errors.course.message}</span>}
                </label><br /><br />
                <button type="submit">Register</button>
            </form>
            {isSubmitSuccessful && (
                <div style={{ marginTop: 20, color: "green" }}>
                    <strong>Registration Successful!</strong>
                    <pre>{JSON.stringify(watch(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CreateReackFormHook;
