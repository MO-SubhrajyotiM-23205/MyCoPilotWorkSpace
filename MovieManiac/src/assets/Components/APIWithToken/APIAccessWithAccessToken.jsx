import React, { useState } from "react";
import axios from "axios";

const APIAccessWithAccessToken = () => {
    const [accessToken, setAccessToken] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    // Step 1: Get access token from first API
    const getAccessToken = async () => {
        try {
            const res = await axios.post("/api/get-token", {
                // Add required body params here
                username: "yourUsername",
                password: "yourPassword"
            });
            setAccessToken(res.data.access_token || "");
            setError(null);
        } catch (err) {
            setError("Failed to get access token");
            setAccessToken("");
        }
    };

    // Step 2: Use access token to call protected API
    const callProtectedApi = async () => {
        try {
            const res = await axios.get("/api/protected-endpoint", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError("Protected API call failed");
            setResponse(null);
        }
    };

    return (
        <div>
            <button onClick={getAccessToken}>Get Access Token</button>
            {accessToken && <div>Access Token: {accessToken}</div>}
            <button onClick={callProtectedApi} disabled={!accessToken}>Call Protected API</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    );
};

export default APIAccessWithAccessToken;