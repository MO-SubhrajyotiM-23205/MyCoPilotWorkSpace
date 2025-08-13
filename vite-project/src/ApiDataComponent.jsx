import { useState, useEffect } from 'react'
import './ApiDataComponent.css'

function ApiDataComponent() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedApi, setSelectedApi] = useState('users')

  // Available APIs to choose from
  const apiOptions = {
    users: 'https://jsonplaceholder.typicode.com/users',
    posts: 'https://jsonplaceholder.typicode.com/posts',
    todos: 'https://jsonplaceholder.typicode.com/todos',
    photos: 'https://jsonplaceholder.typicode.com/photos?_limit=10'
  }

  const fetchData = async (apiUrl) => {
    setLoading(true)
    setError('')
    setData([])

    try {
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`)
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApiChange = (e) => {
    const selected = e.target.value
    setSelectedApi(selected)
    fetchData(apiOptions[selected])
  }

  const handleRefresh = () => {
    fetchData(apiOptions[selectedApi])
  }

  useEffect(() => {
    // Fetch initial data when component mounts
    fetchData(apiOptions[selectedApi])
  }, [])

  const renderDataItem = (item, index) => {
    switch (selectedApi) {
      case 'users':
        return (
          <div key={item.id} className="data-card">
            <h3>{item.name}</h3>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Website:</strong> {item.website}</p>
            <p><strong>Company:</strong> {item.company?.name}</p>
          </div>
        )
      
      case 'posts':
        return (
          <div key={item.id} className="data-card">
            <h3>Post #{item.id}</h3>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
            <small>User ID: {item.userId}</small>
          </div>
        )
      
      case 'todos':
        return (
          <div key={item.id} className="data-card">
            <div className="todo-header">
              <h4>Todo #{item.id}</h4>
              <span className={`status ${item.completed ? 'completed' : 'pending'}`}>
                {item.completed ? '✅ Completed' : '⏳ Pending'}
              </span>
            </div>
            <p>{item.title}</p>
            <small>User ID: {item.userId}</small>
          </div>
        )
      
      case 'photos':
        return (
          <div key={item.id} className="data-card photo-card">
            <img src={item.thumbnailUrl} alt={item.title} />
            <div className="photo-info">
              <h4>Photo #{item.id}</h4>
              <p>{item.title}</p>
              <small>Album ID: {item.albumId}</small>
            </div>
          </div>
        )
      
      default:
        return (
          <div key={index} className="data-card">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        )
    }
  }

  return (
    <div className="api-container">
      <div className="api-header">
        <h2>API Data Fetcher</h2>
        <div className="api-controls">
          <select 
            value={selectedApi} 
            onChange={handleApiChange}
            className="api-select"
          >
            <option value="users">Users</option>
            <option value="posts">Posts</option>
            <option value="todos">Todos</option>
            <option value="photos">Photos</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            className="refresh-btn"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="api-info">
        <p><strong>API Endpoint:</strong> {apiOptions[selectedApi]}</p>
        <p><strong>Total Records:</strong> {data.length}</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching data...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <h3>Error occurred:</h3>
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="data-container">
          <div className="data-grid">
            {data.map((item, index) => renderDataItem(item, index))}
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="no-data">
          <p>No data available</p>
        </div>
      )}
    </div>
  )
}

export default ApiDataComponent
