import { useState } from 'react';
import { apiService } from '../services/apiService';

const TestMyAPI = () => {
    // apiService already has baseURL '/api'; just use relative endpoint below.

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const payload = {
        EmployeeCode: '23205',
        ApplicationGuid: '29F1E750-6D62-4BF0-85F2-571BA61A7364',
        AppIpAddress: '192.168.99.45',
        Password: 'Mosl@123'
    };

    const handleCall = async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        setStatus(null);
    const { success, data, error: err, status: httpStatus } = await apiService.post('api/auth/app', payload);
        setStatus(httpStatus);
        if (success) {
            setResult(data);
            console.log('Success:', httpStatus, data);
        } else {
            setError(err);
            console.error('Error:', err);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '1rem', maxWidth: 800 }}>
            <h2 style={{ marginTop: 0 }}>Test /api/auth/app (apiService)</h2>
            <div style={{ marginBottom: '.75rem' }}>
                <pre style={{ background: '#f5f5f5', padding: '.75rem', borderRadius: 4, fontSize: 13 }}>{JSON.stringify(payload, null, 2)}</pre>
            </div>
            <button onClick={handleCall} disabled={loading} style={{ padding: '.6rem 1.2rem' }}>
                {loading ? 'Sending...' : 'Send Request'}
            </button>
            {status !== null && (
                <span style={{ marginLeft: '1rem', fontFamily: 'monospace', fontSize: 13 }}>Status: {status}</span>
            )}
            {(result || error) && (
                <div style={{ marginTop: '1.25rem' }}>
                    <h3 style={{ margin: '0 0 .5rem' }}>Response</h3>
                    {result && (
                        <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: 6, overflowX: 'auto', fontSize: 13 }}>{JSON.stringify(result, null, 2)}</pre>
                    )}
                    {error && (
                        <div style={{ background: '#ffe6e6', border: '1px solid #ffb3b3', padding: '.75rem', borderRadius: 4 }}>
                            <strong style={{ color: '#c62828' }}>Error</strong>
                            <pre style={{ margin: '.5rem 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 13 }}>{JSON.stringify(error, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
            <p style={{ fontSize: 12, color: '#555', marginTop: '1.5rem' }}>
                Uses shared apiService (axios) so auth headers & refresh logic apply automatically.
            </p>
        </div>
    );
};

export default TestMyAPI;

