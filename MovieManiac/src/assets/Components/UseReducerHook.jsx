import React from "react";

const UseReducerHook = () => {

const initialState = { count: 0 };


const reducer = (state, action) => {
switch (action.type) {
            case "increment":
                return { count: state.count + 1 };
            case "decrement":
                return { count: state.count - 1 };
            case "Reset":
                return initialState;
            default:
                return state;
        }
    
}
const [state, dispatchghgfhgf] = React.useReducer(reducer, initialState);  
    

    return (
        <div>
            <h2>useReducer Hook Example</h2>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatchghgfhgf({ type: "increment" })}>Increment</button>
            <button onClick={() => dispatchghgfhgf({ type: "decrement" })}>decrement</button>
            <button onClick={() => dispatchghgfhgf({ type:"Reset" })}>Reset</button>
        </div>
    );
};

export default UseReducerHook;