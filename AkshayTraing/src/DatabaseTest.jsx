import { useState } from 'react';

export default function DatabaseTest() {
  const [query, setQuery] = useState('SELECT TOP 5 * FROM INFORMATION_SCHEMA.TABLES');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>SQL Server Database Test</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '8px' }}
          placeholder="Enter SQL query..."
        />
      </div>
      
      <button 
        onClick={executeQuery} 
        disabled={loading}
        style={{ padding: '8px 16px', marginBottom: '10px' }}
      >
        {loading ? 'Executing...' : 'Execute Query'}
      </button>
      
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        border: '1px solid #ddd',
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        {result || 'No results yet'}
      </pre>
    </div>
  );
}