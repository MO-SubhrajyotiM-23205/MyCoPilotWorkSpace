
import React, { useState, useCallback } from "react";

const CheckUseCallback = () => {
    const [count, setCount] = useState(10000000000);
    const [platform, setPlatform] = useState("React");

    // chekUseCallback function increments the counter
    const chekUseCallback = useCallback(() => {
        setCount(prev => prev + 1);
    }, []);

    return (
        <div>
            <h2>Check useCallback</h2>
            <p>This component demonstrates useCallback for efficient function memoization.</p>
            <button onClick={chekUseCallback}>Increment</button>
            <span> Count: {count}</span>
            <br />
            <div>
                <div>Development By {platform}</div>
                <button onClick={() => setPlatform(platform === "React" ? "Outsystems" : "React")}>Toggle Platform</button>
            </div>
        </div>
    );
};

export default CheckUseCallback;
