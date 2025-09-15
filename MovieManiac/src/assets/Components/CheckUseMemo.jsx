
import React from "react";

 // Expensive calculation function
    const computeExpensiveValue = (num) => {
        let result = 0;
        for (let i = 0; i < num; i++) {
            result += 1;
        }
        return result;
    };

const CheckUseMemo = () => {
    const [count, setCount] = React.useState(0);
    const [Outsystems, setOutsystems] = React.useState(false);

   
    const [inputValue, setInputValue] = React.useState(1000000);
    // useMemo to memoize the expensive calculation
    const calculatedValue = React.useMemo(() => computeExpensiveValue(inputValue), [inputValue]);
    //const calculatedValue = computeExpensiveValue(inputValue);

    return (
        <div>
            <h2>Check UseMemo</h2>
            <p>This component demonstrates useMemo for expensive calculation.</p>
            <input
                type="number"
                value={inputValue}
                onChange={e => setInputValue(Number(e.target.value))}
                min={0}
            />
            <label> Input Value</label>
            <br />
            <label>Computed Value: {calculatedValue}</label>
            <br />
            <div>
                <div>Development By {Outsystems ? "Outsystems" : "React"}</div>
                <button onClick={() => setOutsystems(!Outsystems)}>Toggle Platform</button>
            </div>
        </div>
    );
};

export default CheckUseMemo;
