import React from "react";
import useData from "../../../hooks/useData";


const APIcallthroughUseData = () => {
  const { data, error, loading } = useData(
            "/api?LATITUDE=32.7221248&LONGITUDE=74.858496",
            {
                method: "POST",
                headers: {
                    "x-api-key": "YGjtkqG4l17CDyC29MHTx7OiG865pA3taHbelODV",
                    "authorizationToken": "tyK3DkD00111USXT"
                },
                body: JSON.stringify({ LATITUDE: 32.7221248, LONGITUDE: 74.858496 })
            }
        );

        return (
            <div>
                <h2>API Test</h2>
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: "red" }}>Error: {error}</div>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        );
};

export default APIcallthroughUseData;
