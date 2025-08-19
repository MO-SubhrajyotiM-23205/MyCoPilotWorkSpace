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

const Filternumber = () => {
    const numbers = [100, 225, 250, 300, 350, 400, 600];
    const filtered = numbers.filter((num) => num > 300);
    return (
        <div>
            <h2>Filtered Numbers (greater than 300)</h2>
            <ul>
                {filtered.map((num) => (
                    <li key={num}>{num}</li>
                ))}
            </ul>
        </div>
    );
}
export { Filternumber };