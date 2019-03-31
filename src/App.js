import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slider from "@material-ui/lab/Slider";
import "./App.css";
import DonutChart from "./components/DonutChart.js";

class App extends Component {
  state = {
    HomePrice: 1200000,
    DownPayment: 400000,
    Interest: 4.5,
    LoanTerm: 30
  };

  handleInputChange = name => event => {
    let value;
    if (name !== "Interest") {
      value = parseInt(event.target.value.replace(/,/g, ""));
    } else {
      value = event.target.value;
    }

    if (isNaN(value)) {
      this.setState({ [name]: 0 });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSliderChange = name => (event, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { HomePrice, DownPayment, Interest, LoanTerm } = this.state;

    // p=principle or loan amount
    const p = this.state.HomePrice - this.state.DownPayment;
    // r=Rate of interersts on monthly basis
    const r = this.state.Interest / 100 / 12;
    // n= tenure of loan in nos of months
    const n = this.state.LoanTerm * 12;
    //calculate EMI
    let emi;
    let ip;
    let total;
    if (n === 0) {
      emi = (p / n).toFixed(2);
      ip = "infinity";
      total = "infinity";
    } else if (r === 0) {
      emi = (p / n).toFixed(2);
      ip = 0;
      total = p;
    } else {
      emi = ((p * r * (1 + r) ** n) / ((1 + r) ** n - 1)).toFixed(2);
      //calculate interest Payable
      ip = Math.round(emi * n - p);
      //calculate total amount Payable
      total = Math.round(emi * n);
    }

    //calculate interest/total payable proportional
    const interestP = (ip / total) * 100;

    return (
      <div className="App">
        <Dialog open={true}>
          <div style={{ display: "flex", flexWrap: "wrap", padding: 20 }}>
            <div className="container-half">
              <h3 className="title" style={{ textAlign: "center" }}>
                Enter Mortgage Information
              </h3>
              <div className="inputContainer">
                <label className="inputLabel">Home Price ($)</label>
                <input
                  className="inputFrame"
                  value={HomePrice.toLocaleString()}
                  onChange={this.handleInputChange("HomePrice")}
                />
                <Slider
                  value={Number(HomePrice)}
                  max={3000000}
                  min={500000}
                  step={10000}
                  aria-labelledby="Home Price"
                  onChange={this.handleSliderChange("HomePrice")}
                  style={{ marginTop: 20, width: "95%" }}
                />
              </div>
              <div className="inputContainer">
                <label className="inputLabel">Down Payment ($)</label>
                <input
                  className="inputFrame"
                  value={DownPayment.toLocaleString()}
                  onChange={this.handleInputChange("DownPayment")}
                />
                <Slider
                  value={Number(DownPayment)}
                  max={3000000}
                  min={10000}
                  step={10000}
                  aria-labelledby="Down Payment"
                  onChange={this.handleSliderChange("DownPayment")}
                  style={{ marginTop: 20, width: "95%" }}
                />
              </div>
              <div className="inputContainer">
                <label className="inputLabel">Interest%</label>
                <input
                  className="inputFrame"
                  value={Interest}
                  onChange={this.handleInputChange("Interest")}
                  min="1"
                  type="number"
                />
                <Slider
                  value={Number(Interest)}
                  max={50}
                  min={0.01}
                  aria-labelledby="Interest"
                  onChange={this.handleSliderChange("Interest")}
                  style={{ marginTop: 20, width: "95%" }}
                />
              </div>
              <div className="inputContainer">
                <label className="inputLabel">Loan Term (yr)</label>
                <input
                  className="inputFrame"
                  value={LoanTerm}
                  onChange={this.handleInputChange("LoanTerm")}
                  min="1"
                  max="100"
                />
                <Slider
                  value={Number(LoanTerm)}
                  max={100}
                  min={1}
                  step={1}
                  aria-labelledby="Loan Term"
                  onChange={this.handleSliderChange("LoanTerm")}
                  style={{ marginTop: 20, width: "95%" }}
                />
              </div>
            </div>
            <div className="divider" />
            <div className="container-half">
              <div className="donut-chart">
                <DonutChart emi={emi} percentage={interestP} />
              </div>
              <div className="outputContainer">
                <label className="outputLabel">
                  <span style={{ marginRight: 5 }}>Principal</span>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#dae2e5",
                      position: "absolute"
                    }}
                  />
                </label>
                <span className="outputValue">${p.toLocaleString()}</span>
                <label className="outputLabel">
                  <span style={{ marginRight: 5 }}>Interest Payable</span>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#3f51b5",
                      position: "absolute"
                    }}
                  />
                </label>
                <span className="outputValue">${ip.toLocaleString()}</span>
                <label className="outputLabel">Total Amount Payable</label>
                <span className="outputValue">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default App;
