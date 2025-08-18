import React from "react";


function Practical1() {
    const numbers = [1, 2, 3, 4, 5];
    return (
        <div>
            <h2>Map Loop Example</h2>
            <ul>
                {numbers.map((num) => (
                    <li key={num}>Item {num}</li>
                ))}
            </ul>
        </div>
    );
}

export default Practical1;