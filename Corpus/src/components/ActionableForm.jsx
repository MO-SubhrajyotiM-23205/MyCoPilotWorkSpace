import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./ActionableForm.css";

const ActionableForm = ({ initialData = {} }) => {
  const [form, setForm] = useState({
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
    modeOfDeposition: "",
    chequeNo: "",
    cmsChequeFile: null,
    splitOption: "",
    ...initialData
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

  const handleCancel = () => {
    setForm({
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
      modeOfDeposition: "",
      chequeNo: "",
      cmsChequeFile: null,
      splitOption: "",
    });
  };

  const viewFile = () => {
    if (form.cmsChequeFile) {
      const url = URL.createObjectURL(form.cmsChequeFile);
      window.open(url, '_blank');
    } else {
      alert("No file uploaded");
    }
  };

  return (
    <Container className="mt-4 actionable-form">
      <Form onSubmit={handleSubmit}>
        {/* Client Details Row 1 */}
        <Row className="mb-3">
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
        </Row>

        {/* Client Details Row 2 */}
        <Row className="mb-3">
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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

        {/* Amount & Options Row */}
        <Row className="mb-4">
          <Col md={3}>
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
            <Form.Group controlId="waiverOption">
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
          </Col>

          <Col md={3}>
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
            <Form.Group controlId="cmsChequeFile">
              <Form.Label>UPLOADED CMS / CHEQUE</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Control
                  type="file"
                  name="cmsChequeFile"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.pdf"
                />
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={viewFile}
                  className="text-primary"
                >
                  VIEW
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="splitOption">
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
          </Col>
        </Row>

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

export default ActionableForm;