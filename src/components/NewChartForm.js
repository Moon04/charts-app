import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Alert,
} from "reactstrap";
import { onReaderLoad, convertCSVToJson } from '../utils/helpers';
import { handleAddChart } from "../actions/charts";

class NewChartForm extends Component {
  state = {
    chartTitle: "",
    chartData: null,
    fileType: "",
    chartDataFile: "",
    alertMessage: "",
  };

  handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState(() => ({
      [key]: value,
    }));
  };

  readFileData = (event, fileType) => {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
  
    reader.onload = () => {
      const fileData = reader.result;
      let data = null;

      if (fileType === "json") {
        data = onReaderLoad(fileData);
      } else if (fileType === "csv") {
        const convertedFile = convertCSVToJson(fileData);
        data = onReaderLoad(convertedFile);
      } 
      this.setState(() => ({ chartData: data? [...data]:null }));
    };
  };

  checkFileValidation = (chartDataFile) => {
    const fileType = this.state.fileType;
    const fileExtensionRegex = /^[^.]+\.(?:json|csv)/;
    const validFile =
      fileExtensionRegex.test(chartDataFile) && fileType === chartDataFile.split(".")[1];

    if (validFile) {
      this.setState(() => ({ alertMessage: "", chartDataFile}));
      return true;
    } else {
      this.setState(() => ({
        alertMessage: "Choose a file with the selected type.",
      }));
      return false;
    }
  };

  handleUpload = (event) => {
    const chartDataFile = event.target.value;
    const fileType = this.state.fileType;
    if (fileType) {
      const isValidFile = this.checkFileValidation(chartDataFile);
      if (isValidFile) {
        this.readFileData(event, fileType);
      }
    } else {
      this.setState(() => ({
        alertMessage: "Select file type first.",
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { chartTitle, chartData } = this.state;

    const chart = {
        title: chartTitle,
        data: chartData
    };
    const { dispatch, id } = this.props;

    dispatch(handleAddChart({...chart}, id));
    this.props.history.push("/");
  };

  handleBackToDashboard = () => {
    this.props.history.push("/");
  };

  onDismiss = () => {
    this.setState((prevState) => ({ alertMessage: "" }));
  };

  render() {
    const { chartTitle, chartData, fileType, chartDataFile } = this.state;

    return (
      <div className="container new-chart-form-container mt-4 pt-4">
        <Button color="secondary" onClick={this.handleBackToDashboard}>⮌</Button>
        <Form
          id="new-chart-form"
          className="mx-auto mt-4 w-75"
          onSubmit={this.handleSubmit}
        >
          <h3 className="text-secondary pb-4 mb-4">Add new chart</h3>

          <FormGroup row>
            <Label for="title" sm={3}>
              Chart Title
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="chartTitle"
                id="chartTitle"
                placeholder="Ex: Created Posts over time"
                value={chartTitle}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup tag="fieldset" row>
            <Label sm={3}>Chart Data File Type</Label>
            <Col sm={9}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="fileType"
                    value="json"
                    checked={fileType === "json"}
                    onChange={this.handleChange}
                  />
                  Json File
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="fileType"
                    value="csv"
                    checked={fileType === "csv"}
                    onChange={this.handleChange}
                  />
                  CSV File
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="chartDataFile" sm={3}>
              Chart Data File
            </Label>
            <Col sm={9}>
              <Input
                type="file"
                name="chartDataFile"
                id="chartDataFile"
                value={chartDataFile}
                onChange={this.handleUpload}
              />
              <FormText color="muted">
                Make sure to upload a file with the same selected file type!
              </FormText>
            </Col>
          </FormGroup>
          <Button
            id="submit-btn"
            className="float-right"
            disabled={!chartTitle || !chartData}
          >
            Submit
          </Button>
        </Form>
        <div className="d-flex justify-content-center">
          <Alert
            color="danger"
            isOpen={this.state.alertMessage ? true : false}
            toggle={this.onDismiss}
          >
            {this.state.alertMessage}
          </Alert>
        </div>
      </div>
    );
  }
}

export default connect()(NewChartForm);
