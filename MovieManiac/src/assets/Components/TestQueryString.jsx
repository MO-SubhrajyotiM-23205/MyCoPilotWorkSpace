
import React,{use, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

const TestQueryString = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") || "Not provided";
    const phone = searchParams.get("phone") || "Not provided";
    const QueryDataObject = useContext(UserContext); // Example usage of UserContext
    console.log("UserContext Data:", QueryDataObject);
    return (
        <div>
            <h2>Test Query String</h2>
            <p>This is a test component for Query String handling.</p>
            <p>Name: {name}</p>
            <p>Phone: {phone}</p>
        </div>
    );
}

export default TestQueryString;
