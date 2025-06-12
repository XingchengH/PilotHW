import React, { Component } from "react";
import cities from "./data";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cities,
      activeBtn: null,
    };
  }

  renderContent = () => {
    const { activeBtn, cities } = this.state;
    if (cities[activeBtn]) {
      const cityData = cities[activeBtn];
      return (
          <div className={`tab-pane text-center ${activeBtn === cityData.title ? 'active' : ''}`}>
              <h2>{cityData.title}</h2>
              <p>{cityData.content}</p>
              <img src={cityData.img} alt={cityData.title} className="img-fluid" style={{width: '1000px'}} />
          </div>
      );
    } else {
      return (
        <div className="tab-pane">
          <h2>City not found</h2>
          <p>Please select a valid city.</p>
        </div>
      );
    }

    // return null;
  };

  render() {
    return (
      <>
        <div className="container mt-5">
          <ul className="nav nav-tabs justify-content-center mb-3">
            {Object.keys(this.state.cities).map((city) => (
              <li className="nav-item" key={city}>
                <button
                  className={`nav-link ${
                    this.state.activeBtn === city ? "active" : ""
                  }`}
                  onClick={() => this.setState({ activeBtn: city })}
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {this.state.activeBtn ? (
              this.renderContent()
            ) : (
              <div className="card text-center p-5">
                <h2 className="card-title">Welcome</h2>
                <p className="card-text">
                  Please select a city to view its details.
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
