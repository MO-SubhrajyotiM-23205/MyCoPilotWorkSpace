import React from "react";
import Usecounter from "./UseCounter";
import "../../../App.css";

const CheckUseMemo = () => {
    const [counter, setCounter] = React.useState(1);
    const [theme, setTheme] = React.useState("light");

    const toggletheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    // const incrementCounter = () => {
    //     setCounter(counter + 1);
    // }
     const incrementCounter = React.useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    return (
        <div className={theme}>
            <Usecounter counter={counter} incrementCounter={incrementCounter} />
            <h2>Theme :{theme}</h2>
            <button onClick={toggletheme}>Toggle Theme</button>
        </div>
    );
};

export default CheckUseMemo;
