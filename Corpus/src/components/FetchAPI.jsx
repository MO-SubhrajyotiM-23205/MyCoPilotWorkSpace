import React, { useState } from "react";

const FetchAPI = () => {
	const [clientId, setClientId] = useState("");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const handleFetch = async () => {
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const response = await fetch(`/api/Corpus/search/${clientId}`);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const result = await response.json();
			setData(result);
			
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);

		}
	};
console.log('API Response:', data?.clientName);
	return (
		<div style={{ padding: "1rem" }}>
			<h2>Fetch Corpus Data</h2>
			<input
				type="text"
				placeholder="Enter Client ID"
				value={clientId}
				onChange={(e) => setClientId(e.target.value)}
				style={{ marginRight: "0.5rem" }}
			/>
			<button onClick={handleFetch} disabled={loading || !clientId}>
				{loading ? "Loading..." : "Fetch"}
			</button>
			{error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
			{data && (
				<div style={{ marginTop: "1rem", border: "1px solid #ddd", padding: "1rem", borderRadius: "4px" }}>
					<h3>Client Information</h3>
                    
					<div><strong>Name:</strong> {data[0]?.clientName || 'N/A'}</div>
					<div><strong>Code:</strong> {data[0]?.clientCode || 'N/A'}</div>
					<div><strong>PAN:</strong> {data[0]?.panNo || 'N/A'}</div>
					<div><strong>Strategy:</strong> {data[0]?.strategyName || 'N/A'}</div>
					<div><strong>DP ID:</strong> {data[0]?.dP_ID || 'N/A'}</div>
					{(data[0]?.jointHold1) && <div><strong>Joint Holder 1:</strong> {data.jointHold1 || data[0]?.jointHold1}</div>}
					{(data[0]?.jointHold2) && <div><strong>Joint Holder 2:</strong> {data.jointHold2 || data[0]?.jointHold2}</div>}
					{(data[0]?.jointHold3) && <div><strong>Joint Holder 3:</strong> {data.jointHold3 || data[0]?.jointHold3}</div>}
					<div><strong>AUM:</strong> {data.aum ?? data[0]?.aum ?? 0}</div>
					<div><strong>Net Investment:</strong> {data.netInvestment ?? data[0]?.netInvestment ?? 0}</div>
				</div>
			)}
			{data && (
				<pre style={{ marginTop: "1rem", background: "#f4f4f4", padding: "1rem" }}>
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</div>
	);
};

export default FetchAPI;
