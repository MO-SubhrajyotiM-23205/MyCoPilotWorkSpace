import React from "react";

const UseReducerHook = () => {

const initialState = { count: 0 };
const [state, dispatch] = React.useReducer(reducer, initialState);  
       
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

    

    return (
        <div>
            <h2>useReducer Hook Example</h2>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
            <button onClick={() => dispatch({ type:"Reset" })}>Reset</button>
        </div>
    );
};

export default UseReducerHook;