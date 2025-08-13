import { useState, useEffect } from 'react'
import './BusinessDashboard.css'

// Mock data for demonstration
const mockDocuments = [
  { id: 1, title: 'Budget Proposal 2025', type: 'Financial', submittedBy: 'John Smith', submissionDate: '2025-08-10', status: 'pending', priority: 'high', department: 'Finance' },
  { id: 2, title: 'Marketing Campaign Plan', type: 'Marketing', submittedBy: 'Sarah Johnson', submissionDate: '2025-08-11', status: 'in-review', priority: 'medium', department: 'Marketing' },
  { id: 3, title: 'IT Security Policy Update', type: 'Policy', submittedBy: 'Mike Davis', submissionDate: '2025-08-09', status: 'approved', priority: 'high', department: 'IT' },
  { id: 4, title: 'Employee Handbook Revision', type: 'HR', submittedBy: 'Lisa Brown', submissionDate: '2025-08-08', status: 'rejected', priority: 'low', department: 'HR' },
  { id: 5, title: 'Project Timeline Q4', type: 'Operations', submittedBy: 'Tom Wilson', submissionDate: '2025-08-12', status: 'pending', priority: 'medium', department: 'Operations' }
]

const mockAnalytics = {
  totalDocuments: 156,
  pendingApprovals: 23,
  approvedToday: 8,
  rejectedToday: 2,
  averageApprovalTime: '2.5 days',
  topDepartment: 'Finance'
}

function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'pending', label: 'Pending Approvals', icon: '⏳' },
    { id: 'workflow', label: 'Workflow', icon: '🔄' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const handleApproval = (docId, action) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { ...doc, status: action, lastAction: new Date().toISOString() }
        : doc
    ))
    setSelectedDocument(null)
  }

  const getFilteredDocuments = () => {
    return documents.filter(doc => {
      const statusMatch = filterStatus === 'all' || doc.status === filterStatus
      const priorityMatch = filterPriority === 'all' || doc.priority === filterPriority
      return statusMatch && priorityMatch
    })
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'in-review': return 'status-in-review'
      case 'approved': return 'status-approved'
      case 'rejected': return 'status-rejected'
      default: return 'status-default'
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return 'priority-default'
    }
  }

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{mockAnalytics.totalDocuments}</h3>
            <p>Total Documents</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{mockAnalytics.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{mockAnalytics.approvedToday}</h3>
            <p>Approved Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{mockAnalytics.rejectedToday}</h3>
            <p>Rejected Today</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Documents</h3>
        <div className="document-list">
          {documents.slice(0, 5).map(doc => (
            <div key={doc.id} className="document-item">
              <div className="document-info">
                <h4>{doc.title}</h4>
                <p>By {doc.submittedBy} • {doc.department}</p>
              </div>
              <div className="document-meta">
                <span className={`status-badge ${getStatusBadgeClass(doc.status)}`}>
                  {doc.status}
                </span>
                <span className={`priority-badge ${getPriorityBadgeClass(doc.priority)}`}>
                  {doc.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPendingApprovals = () => (
    <div className="pending-content">
      <div className="filters">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-review">In Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="documents-grid">
        {getFilteredDocuments().map(doc => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <h4>{doc.title}</h4>
              <div className="document-badges">
                <span className={`status-badge ${getStatusBadgeClass(doc.status)}`}>
                  {doc.status}
                </span>
                <span className={`priority-badge ${getPriorityBadgeClass(doc.priority)}`}>
                  {doc.priority}
                </span>
              </div>
            </div>
            
            <div className="document-details">
              <p><strong>Type:</strong> {doc.type}</p>
              <p><strong>Submitted by:</strong> {doc.submittedBy}</p>
              <p><strong>Department:</strong> {doc.department}</p>
              <p><strong>Date:</strong> {doc.submissionDate}</p>
            </div>

            <div className="document-actions">
              <button 
                className="view-btn"
                onClick={() => setSelectedDocument(doc)}
              >
                View Details
              </button>
              {doc.status === 'pending' && (
                <>
                  <button 
                    className="approve-btn"
                    onClick={() => handleApproval(doc.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleApproval(doc.id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderWorkflow = () => (
    <div className="workflow-content">
      <h3>Document Workflow Process</h3>
      <div className="workflow-diagram">
        <div className="workflow-step">
          <div className="step-circle">1</div>
          <div className="step-info">
            <h4>Document Submission</h4>
            <p>Employee submits document for approval</p>
          </div>
        </div>
        <div className="workflow-arrow">→</div>
        
        <div className="workflow-step">
          <div className="step-circle">2</div>
          <div className="step-info">
            <h4>Initial Review</h4>
            <p>Department head reviews document</p>
          </div>
        </div>
        <div className="workflow-arrow">→</div>
        
        <div className="workflow-step">
          <div className="step-circle">3</div>
          <div className="step-info">
            <h4>Approval Process</h4>
            <p>Manager approves or requests changes</p>
          </div>
        </div>
        <div className="workflow-arrow">→</div>
        
        <div className="workflow-step">
          <div className="step-circle">4</div>
          <div className="step-info">
            <h4>Final Approval</h4>
            <p>Document approved and implemented</p>
          </div>
        </div>
      </div>

      <div className="workflow-settings">
        <h3>Workflow Configuration</h3>
        <div className="setting-item">
          <label>Auto-assignment rules</label>
          <select>
            <option>By Department</option>
            <option>By Document Type</option>
            <option>By Priority Level</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Approval timeout (days)</label>
          <input type="number" defaultValue="5" min="1" max="30" />
        </div>
        <div className="setting-item">
          <label>Required approvers</label>
          <input type="number" defaultValue="2" min="1" max="5" />
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="analytics-content">
      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Approval Statistics</h4>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{height: '80%', backgroundColor: '#28a745'}}>
              <span>Approved: 85%</span>
            </div>
            <div className="chart-bar" style={{height: '15%', backgroundColor: '#dc3545'}}>
              <span>Rejected: 15%</span>
            </div>
          </div>
        </div>
        
        <div className="analytics-card">
          <h4>Department Performance</h4>
          <div className="performance-list">
            <div className="performance-item">
              <span>Finance</span>
              <div className="performance-bar">
                <div style={{width: '90%'}} className="performance-fill"></div>
              </div>
              <span>90%</span>
            </div>
            <div className="performance-item">
              <span>HR</span>
              <div className="performance-bar">
                <div style={{width: '75%'}} className="performance-fill"></div>
              </div>
              <span>75%</span>
            </div>
            <div className="performance-item">
              <span>IT</span>
              <div className="performance-bar">
                <div style={{width: '85%'}} className="performance-fill"></div>
              </div>
              <span>85%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-summary">
        <h3>Key Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Average Approval Time</span>
            <span className="metric-value">{mockAnalytics.averageApprovalTime}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Top Performing Department</span>
            <span className="metric-value">{mockAnalytics.topDepartment}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Documents This Month</span>
            <span className="metric-value">47</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Success Rate</span>
            <span className="metric-value">94%</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="settings-content">
      <h3>Dashboard Settings</h3>
      <div className="settings-section">
        <h4>Notification Preferences</h4>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Email notifications for new documents
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Push notifications for urgent approvals
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Daily summary reports
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h4>User Permissions</h4>
        <div className="setting-item">
          <label>Role</label>
          <select defaultValue="manager">
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="reviewer">Reviewer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Department Access</label>
          <select defaultValue="all">
            <option value="all">All Departments</option>
            <option value="finance">Finance Only</option>
            <option value="hr">HR Only</option>
            <option value="it">IT Only</option>
          </select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="business-dashboard">
      <div className="dashboard-header">
        <h1>📋 Business Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin User</span>
          <div className="user-avatar">👤</div>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'pending' && renderPendingApprovals()}
        {activeTab === 'workflow' && renderWorkflow()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {selectedDocument && (
        <div className="modal-overlay" onClick={() => setSelectedDocument(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedDocument.title}</h3>
              <button className="close-btn" onClick={() => setSelectedDocument(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="document-detail">
                <p><strong>Type:</strong> {selectedDocument.type}</p>
                <p><strong>Submitted by:</strong> {selectedDocument.submittedBy}</p>
                <p><strong>Department:</strong> {selectedDocument.department}</p>
                <p><strong>Submission Date:</strong> {selectedDocument.submissionDate}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-badge ${getStatusBadgeClass(selectedDocument.status)}`}>
                    {selectedDocument.status}
                  </span>
                </p>
                <p><strong>Priority:</strong> 
                  <span className={`priority-badge ${getPriorityBadgeClass(selectedDocument.priority)}`}>
                    {selectedDocument.priority}
                  </span>
                </p>
              </div>
              <div className="document-content">
                <h4>Document Content</h4>
                <p>This is a preview of the document content. In a real application, this would show the actual document content or provide a download link.</p>
              </div>
            </div>
            <div className="modal-actions">
              {selectedDocument.status === 'pending' && (
                <>
                  <button 
                    className="approve-btn"
                    onClick={() => handleApproval(selectedDocument.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => handleApproval(selectedDocument.id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
              <button className="close-modal-btn" onClick={() => setSelectedDocument(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessDashboard
