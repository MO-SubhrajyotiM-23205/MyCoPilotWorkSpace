import { useState } from 'react';
import * as XLSX from 'xlsx';
import ActionableForm from './ActionableForm';
import '../components/Actionable.css';

const Pending = () => {
  const [searchClient, setSearchClient] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  
  const [records, setRecords] = useState([
    {
      id: 1,
      clientName: "RAJESH KUMAR",
      code: "PMG-5123",
      pan: "BGTPK5678L",
      strategyName: "EQUITY GROWTH STRATEGY",
      jointHolder: "PRIYA KUMAR",
      dpId: "12010600-45678912",
      status: "Pending",
      remarks: "Under Review",
      createdBy: "Amit Sharma",
      createdDate: "2024-01-20",
      amount: "75000",
      modeOfDeposition: "NEFT",
      splitOption: "YES",
      waiverOption: "NO"
    },
    {
      id: 2,
      clientName: "MEERA PATEL",
      code: "PMG-6789",
      pan: "CGTPM9012N",
      strategyName: "BALANCED FUND STRATEGY",
      jointHolder: "VIKASH PATEL",
      dpId: "12010600-78901234",
      status: "Pending",
      remarks: "Awaiting Approval",
      createdBy: "Ravi Singh",
      createdDate: "2024-01-18",
      amount: "100000",
      modeOfDeposition: "CHEQUE",
      splitOption: "NO",
      waiverOption: "YES"
    }
  ]);

  const filteredRecords = records.filter(record => {
    const matchesClient = record.clientName.toLowerCase().includes(searchClient.toLowerCase());
    const matchesDate = (!fromDate || record.createdDate >= fromDate) && 
                       (!toDate || record.createdDate <= toDate);
    return matchesClient && matchesDate;
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pending Records');
    XLSX.writeFile(wb, 'pending_records.xlsx');
  };

  const handleEdit = (id, field, value) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ));
  };

  const handleResubmit = (id) => {
    console.log('Resubmitting record:', id);
  };

  return (
    <div className="actionable-container">
      <div className="filters">
        <div className="filter-group">
          <label>Search Client</label>
          <input
            type="text"
            placeholder="Search Client"
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="filter-group">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="date-input"
          />
        </div>
        <button onClick={exportToExcel} className="export-btn">EXPORT</button>
      </div>

      <table className="actionable-table">
        <thead>
          <tr>
            <th>View</th>
            <th>Client Name</th>
            <th>Code</th>
            <th>PAN</th>
            <th>Strategy Name</th>
            <th>Joint Holder</th>
            <th>DP ID</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Created By</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <>
              <tr key={record.id}>
                <td>
                  <button 
                    onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}
                    className="view-btn"
                  >
                    {expandedRow === record.id ? '−' : '+'}
                  </button>
                </td>
                <td>{record.clientName}</td>
                <td>{record.code}</td>
                <td>{record.pan}</td>
                <td>{record.strategyName}</td>
                <td>{record.jointHolder}</td>
                <td>{record.dpId}</td>
                <td>{record.status}</td>
                <td>{record.remarks}</td>
                <td>{record.createdBy}</td>
                <td>{record.createdDate}</td>
              </tr>
              {expandedRow === record.id && (
                <tr className="expanded-row">
                  <td colSpan="11">
                    <ActionableForm 
                      initialData={{
                        clientName: record.clientName,
                        pmsCode: record.code,
                        panNo: record.pan,
                        strategyName: record.strategyName,
                        jointHolder: record.jointHolder,
                        dpId: record.dpId,
                        amount: record.amount,
                        modeOfDeposition: record.modeOfDeposition,
                        splitOption: record.splitOption,
                        waiverOption: record.waiverOption
                      }}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pending;