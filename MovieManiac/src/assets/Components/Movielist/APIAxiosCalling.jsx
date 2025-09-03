import React, { useState } from "react";
import axios from "axios";

const APIAxiosCalling = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const callApi = async () => {
        try {
                const res = await axios.post(
                    "/api?LATITUDE=32.7221248&LONGITUDE=74.858496",
                    undefined,
                    {
                        headers: {
                            "x-api-key": "YGjtkqG4l17CDyC29MHTx7OiG865pA3taHbelODV",
                            "authorizationToken": "tyK3DkD00111USXT"
                        }
                    }
                );
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError("API call failed");
            setResponse(null);
        }
    };

    return (
        <div>
            <button onClick={callApi}>Call API with Axios</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default APIAxiosCalling;
