
import React, { useState, useRef } from "react";
import CheckCallbackFunction from "./CheckWorkerFunction";

const CheckUseCallback = () => {
    const [count, setCount] = useState(100000000);
    const [platform, setPlatform] = useState("React");
    const [loading, setLoading] = useState(false);
    const workerRef = useRef(null);

    React.useEffect(() => {
        // Create worker on mount
        workerRef.current = new window.Worker(new URL("./expensiveWorker.js", import.meta.url));
        return () => {
            // Cleanup worker on unmount
            if (workerRef.current) workerRef.current.terminate();
        };
    }, []);

    const chekUseCallback = React.useCallback(() => {
        setLoading(true);
        workerRef.current.onmessage = (e) => {
            setCount(prev => prev + 1); // Or use e.data for the result if needed
            setLoading(false);
        };
        workerRef.current.postMessage(100000000);
    }, []);

    return (
        <div>
            <h2>Check useCallback</h2>
            <p>This component demonstrates useCallback for efficient function memoization and uses a Web Worker for expensive calculation.</p>
            <CheckCallbackFunction onIncrement={chekUseCallback} />
            <span> Count: {count}</span>
            {loading && <span> (Calculating...)</span>}
            <br />
            <div>
                <div>Development By {platform}</div>
                <button onClick={() => setPlatform(platform === "React" ? "Outsystems" : "React")}>Toggle Platform</button>
            </div>
        </div>
    );
};

export default CheckUseCallback;
