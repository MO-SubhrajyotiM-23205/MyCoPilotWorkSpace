import React, { useEffect, useState } from "react";

const APITest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const checkPromise =  async () => {

        const chkValueofPromise = await fetch("/api?LATITUDE=32.7221248&LONGITUDE=74.858496", {
            method: "POST",
            headers: {
                "x-api-key": "YGjtkqG4l17CDyC29MHTx7OiG865pA3taHbelODV",
                "authorizationToken": "tyK3DkD00111USXT"
            }
        }).then(  (response1) =>  response1.json()
        ).then((data) => {
            setResponse(data);
            setError(null);
    
        }).catch((err) => {
            setError("API call failed");
            setResponse(null);
        });
        console.log("res",response);
    };

    const callApi = async () => {
        try {
            const res = await fetch("/api?LATITUDE=32.7221248&LONGITUDE=74.858496", {
                method: "POST",
                headers: {
                    "x-api-key": "YGjtkqG4l17CDyC29MHTx7OiG865pA3taHbelODV",
                    "authorizationToken": "tyK3DkD00111USXT"
                },
                body: JSON.stringify({
                    LATITUDE: 32.7221248,
                    LONGITUDE: 74.858496
                })
            });
            const data = await res.json();
            setResponse(data);
            setError(null);
        } catch (err) {
            setError("API call failed");
            setResponse(null);
        }
    };

    return (
        <div>
            <button onClick={checkPromise}>Promises</button>
            <button onClick={callApi}>Call API</button>
            {response && (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default APITest;
