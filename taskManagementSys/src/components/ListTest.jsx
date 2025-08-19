
import React from "react";


const countries = ["India", "USA", "Canada"];

const ListTest = ({ asDropdown = false, onChange, value }) => {
    if (asDropdown) {
        return (
            <select value={value} onChange={onChange}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        );
    }
    return (
        <div>
            <ul>
                {countries.map((country) => (
                    <li key={country}>{country}</li>
                ))}
            </ul>
        </div>
    );
};



export default ListTest;
