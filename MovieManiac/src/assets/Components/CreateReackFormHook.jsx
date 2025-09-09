import React from "react";
import { useForm } from "react-hook-form";


const CreateReackFormHook = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, watch } = useForm();

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
                    <input type="text" {...register("name", { required: true })} />
                    {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
                </label><br /><br />
                <label>Email:<br />
                    <input type="email" {...register("email", { required: true })} />
                    {errors.email && <span style={{ color: 'red' }}>Email is required</span>}
                </label><br /><br />
                <label>Phone:<br />
                    <input type="tel" {...register("phone", { required: true })} />
                    {errors.phone && <span style={{ color: 'red' }}>Phone is required</span>}
                </label><br /><br />
                <label>Date of Birth:<br />
                    <input type="date" {...register("dob", { required: true })} />
                    {errors.dob && <span style={{ color: 'red' }}>Date of Birth is required</span>}
                </label><br /><br />
                <label>Course:<br />
                    <input type="text" {...register("course", { required: true })} />
                    {errors.course && <span style={{ color: 'red' }}>Course is required</span>}
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
