import React from "react";
import { useRef } from "react";



const CheckUseRefHook = () => {


    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>CheckUseRefHook Component</h2>
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" ref={inputRef} /><br /><br />
                <label>Mobile: </label>
                <input type="password" placeholder="Enter your mobile number" ref={inputRef} />
                <button type="button" onClick={() => inputRef.current.type = "password"}>Hide Input</button>
                <button type="button" onClick={() => inputRef.current.type = "text"}>Show Input</button><br /><br />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            {/* <button type="button" onClick={() => console.log(inputRef)}>Show Console</button> */}

        </div>
    );
}

export default CheckUseRefHook;
