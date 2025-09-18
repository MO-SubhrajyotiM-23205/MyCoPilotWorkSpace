import { useState } from "react";
import * as XLSX from "xlsx";
import ActionableForm from "./ActionableForm";
import "./Actionable.css";

const Actionable = () => {
  const [searchClient, setSearchClient] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  // Sample data - replace with actual API data
  const [records, setRecords] = useState([
    {
      id: 1,
      clientName: "ANIL GUPTA",
      code: "PMG-4879",
      pan: "AGTPG4372M",
      strategyName: "INDIA GROWTH STRATEGY",
      jointHolder: "SUNITA GUPTA",
      dpId: "12010600-34959584",
      status: "Rejected",
      remarks: "Incorrect Amount",
      createdBy: "Geeta Pandey",
      createdDate: "2024-01-15",
      amount: "50000",
      modeOfDeposition: "CHEQUE",
      splitOption: "NO",
      waiverOption: "NO",
    },
    {
      id: 2,
      clientName: "Tejashree Randive",
      code: "PMG-4879",
      pan: "AGTPG4372M",
      strategyName: "INDIA GROWTH STRATEGY",
      jointHolder: "SUNITA GUPTA",
      dpId: "12010600-34959584",
      status: "Rejected",
      remarks: "Incorrect Amount",
      createdBy: "Geeta Pandey",
      createdDate: "2024-01-11",
      amount: "50000",
      modeOfDeposition: "CHEQUE",
      splitOption: "NO",
      waiverOption: "NO",
    },
  ]);

  const filteredRecords = records.filter((record) => {
    const matchesClient = record.clientName
      .toLowerCase()
      .includes(searchClient.toLowerCase());
    const matchesDate =
      (!fromDate || record.createdDate >= fromDate) &&
      (!toDate || record.createdDate <= toDate);
    return matchesClient && matchesDate;
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Actionable Records");
    XLSX.writeFile(wb, "actionable_records.xlsx");
  };

  const handleEdit = (id, field, value) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const handleResubmit = (id) => {
    // Move to pending bucket logic
    console.log("Resubmitting record:", id);
    // API call to resubmit
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
        <button onClick={exportToExcel} className="export-btn">
          EXPORT
        </button>
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
          {filteredRecords.map((record) => (
            <>
              <tr key={record.id}>
                <td>
                  <button
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === record.id ? null : record.id
                      )
                    }
                    className="view-btn"
                  >
                    {expandedRow === record.id ? "−" : "+"}
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

export default Actionable;
