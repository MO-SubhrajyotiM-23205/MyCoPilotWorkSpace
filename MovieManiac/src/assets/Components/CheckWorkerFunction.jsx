import React from "react";

// Extracted callback function component
const CheckCallbackFunction = ({ onIncrement }) => {
    return (
        <button onClick={onIncrement}>Increment</button>
    );
};

export default CheckCallbackFunction;
