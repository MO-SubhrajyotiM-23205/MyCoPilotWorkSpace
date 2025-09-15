import { memo } from "react";
import React    from "react";

const Usecounter = ({ counter, incrementCounter }) => {

    console.log("UseCounter Rendered");
    let starttime = performance.now();
    while (performance.now() - starttime < 500) {
        // Simulate expensive calculation
    }   
    return (
        <div>
            <h2>Counter :{counter}</h2>
            <button onClick={incrementCounter}>Increment Counter</button>
        </div>
    );
}

export default memo(Usecounter);
