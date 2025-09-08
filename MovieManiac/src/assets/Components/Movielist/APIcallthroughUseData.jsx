import React from "react";
import useData from "../../../hooks/useData";


const APIcallthroughUseData = () => {
  const { data, error, loading } = useData("http://localhost:5000/api/data");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default APIcallthroughUseData;
