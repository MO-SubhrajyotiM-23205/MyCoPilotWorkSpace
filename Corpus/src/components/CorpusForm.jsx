import React, { useState } from "react";
import axios from "axios";
import "./CorpusForm.css";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";

const CorpusForm = ({ hideSearch = false, initialData = {} }) => {
  const [form, setForm] = useState({
    ...{
      searchClient: "",
      clientName: "",
      pmsCode: "",
      panNo: "",
      aum: "",
      strategyName: "",
      jointHolder: "",
      dpId: "",
      netInvestment: "",
      amount: "",
      amountWords: "",
      waiverOption: "",
      waiverFile: null,
      modeOfDeposition: "",
      chequeNo: "",
      cmsChequeFile: null,
      utrNo: "",
      utrProofFile: null,
      splitOption: "",
      clientCode1: "",
      amount1: "",
      clientCode2: "",
      amount2: "",
      splitProofFile: null,
    },
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  const handleView = async (clientCode) => {
    if (!clientCode) {
      alert("Please enter client code");
      return;
    }
    try {
      console.log("Fetching data for client code:", clientCode);
      const response = await axios.get(
        `http://localhost:7206/api/Corpus/search/${clientCode}`
      );
      const data = response.data;
      console.log(data);
      setForm((prev) => ({
        ...prev,
        clientName: data.clientName || "",
        pmsCode: data.pmsCode || "",
        panNo: data.panNo || "",
        aum: data.aum || "",
        strategyName: data.strategyName || "",
        jointHolder: data.jointHolder || "",
        dpId: data.dpId || "",
        netInvestment: data.netInvestment || "",
      }));
    } catch (error) {
      console.error(
        "Failed to fetch data:",
        error.response?.data || error.message
      );
      alert("Error fetching client data");
    }
  };

  const handleCancel = () => {
    setForm({
      searchClient: "",
      clientName: "",
      pmsCode: "",
      panNo: "",
      aum: "",
      strategyName: "",
      jointHolder: "",
      dpId: "",
      netInvestment: "",
      amount: "",
      amountWords: "",
      waiverOption: "",
      waiverFile: null,
      modeOfDeposition: "",
      chequeNo: "",
      cmsChequeFile: null,
      utrNo: "",
      utrProofFile: null,
      splitOption: "",
      clientCode1: "",
      amount1: "",
      clientCode2: "",
      amount2: "",
      splitProofFile: null,
    });
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        {/* Search Client */}
        {!hideSearch && (
          <Row className="align-items-end mb-3">
            <Col md={4}>
              <Form.Group controlId="searchClient">
                <Form.Label>Search Client</Form.Label>
                <Form.Control
                  type="text"
                  name="searchClient"
                  value={form.searchClient}
                  onChange={handleChange}
                  placeholder="Enter client name/code"
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => handleView(form.searchClient)}
              >
                View
              </Button>
            </Col>
          </Row>
        )}

        {/* Client Details */}
        <Card className="mb-4">
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="clientName">
                  <Form.Label>CLIENT NAME</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={form.clientName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="pmsCode">
                  <Form.Label>PMS CODE</Form.Label>
                  <Form.Control
                    type="text"
                    name="pmsCode"
                    value={form.pmsCode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="panNo">
                  <Form.Label>PAN NO</Form.Label>
                  <Form.Control
                    type="text"
                    name="panNo"
                    value={form.panNo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="aum">
                  <Form.Label>AUM</Form.Label>
                  <Form.Control
                    type="text"
                    name="aum"
                    value={form.aum}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="strategyName">
                  <Form.Label>STRATEGY NAME</Form.Label>
                  <Form.Control
                    type="text"
                    name="strategyName"
                    value={form.strategyName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="jointHolder">
                  <Form.Label>JOINT HOLDER</Form.Label>
                  <Form.Control
                    type="text"
                    name="jointHolder"
                    value={form.jointHolder}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="dpId">
                  <Form.Label>DP ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="dpId"
                    value={form.dpId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="netInvestment">
                  <Form.Label>NET INVESTMENT</Form.Label>
                  <Form.Control
                    type="text"
                    name="netInvestment"
                    value={form.netInvestment}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Amount & Waiver */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>AMOUNT</Form.Label>
                  <Form.Control
                    type="text"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amountWords">
                  <Form.Label>AMOUNT IN WORDS</Form.Label>
                  <Form.Control
                    type="text"
                    name="amountWords"
                    value={form.amountWords}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="waiverOption">
                  <Form.Label>WAIVER OPTION</Form.Label>
                  <Form.Select
                    name="waiverOption"
                    value={form.waiverOption}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="waiverFile">
                  <Form.Label>UPLOAD WAIVER</Form.Label>
                  <Form.Control
                    type="file"
                    name="waiverFile"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.pdf"
                  />
                  <Form.Text muted>
                    Upload file in jpg, jpeg, pdf format only up to 5 MB
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="modeOfDeposition">
                  <Form.Label>MODE OF DEPOSITION</Form.Label>
                  <Form.Select
                    name="modeOfDeposition"
                    value={form.modeOfDeposition}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="CHEQUE">CHEQUE</option>
                    <option value="NEFT/RTGS">NEFT / RTGS</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="chequeNo">
                  <Form.Label>CHEQUE NO</Form.Label>
                  <Form.Control
                    type="text"
                    name="chequeNo"
                    value={form.chequeNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cmsChequeFile">
                  <Form.Label>UPLOAD CMS / CHEQUE</Form.Label>
                  <Form.Control
                    type="file"
                    name="cmsChequeFile"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.pdf"
                  />
                  <Form.Text muted>
                    Upload file in jpg, jpeg, pdf format only up to 5 MB
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="utrNo">
                  <Form.Label>UTR NO</Form.Label>
                  <Form.Control
                    type="text"
                    name="utrNo"
                    value={form.utrNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="utrProofFile">
                  <Form.Label>UPLOAD UTR PROOF</Form.Label>
                  <Form.Control
                    type="file"
                    name="utrProofFile"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.pdf"
                  />
                  <Form.Text muted>
                    Upload file in jpg, jpeg, pdf format only up to 5 MB
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="splitOption">
                  <Form.Label>SPLIT OPTION</Form.Label>
                  <Form.Select
                    name="splitOption"
                    value={form.splitOption}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="clientCode1">
                  <Form.Label>CLIENT CODE</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientCode1"
                    value={form.clientCode1}
                    onChange={handleChange}
                    placeholder="FOP123"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount1">
                  <Form.Label>AMOUNT</Form.Label>
                  <Form.Control
                    type="text"
                    name="amount1"
                    value={form.amount1}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="clientCode2">
                  <Form.Label>CLIENT CODE</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientCode2"
                    value={form.clientCode2}
                    onChange={handleChange}
                    placeholder="BOF123"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount2">
                  <Form.Label>AMOUNT</Form.Label>
                  <Form.Control
                    type="text"
                    name="amount2"
                    value={form.amount2}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="splitProofFile">
                  <Form.Label>UPLOAD SPLIT PROOF</Form.Label>
                  <Form.Control
                    type="file"
                    name="splitProofFile"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.pdf"
                  />
                  <Form.Text muted>
                    Upload file in jpg, jpeg, pdf format only up to 5 MB
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Submit / Cancel */}
        <div className="text-center">
          <Button type="submit" variant="primary" className="me-3">
            SUBMIT
          </Button>
          <Button type="button" variant="danger" onClick={handleCancel}>
            CANCEL
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CorpusForm;
