import React, { Component } from 'react';
import cities from './data';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: cities,
            activeBtn: 'London',
        };
    }

    renderContent = () => {
        const { activeBtn, cities } = this.state;                
        if (cities[activeBtn]) {
            const cityData = cities[activeBtn];            
            return (
                <div className={`tab-pane ${activeBtn === cityData.title ? 'active' : ''}`}>
                    <h2>{cityData.title}</h2>
                    <p>{cityData.content}</p>
                    <img src={cityData.img} alt={cityData.title} className="img-fluid" style={{width: '500px'}} />
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
    }

    render() {
        return (
        <>
            <div className="container mt-5">
                <ul className="nav nav-tabs justify-content-center mb-3">
                    {Object.keys(this.state.cities).map((city) => (
                        <li className="nav-item" key={city}>
                            <button
                                className={`nav-link ${this.state.activeBtn === city ? 'active' : ''}`}
                                onClick={() => this.setState({ activeBtn: city })}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* <div className="tab-content">
                    {Object.keys(this.state.cities).map((city) => {
                        const cityData = this.state.cities[city];
                        return (
                            <div
                                className={`tab-pane ${this.state.activeBtn === city ? 'active' : ''}`}
                                key={city}
                            >
                                <h2>{cityData.title}</h2>
                                <p>{cityData.content}</p>
                                <img src={cityData.img} alt={cityData.title} className="img-fluid w-100 " />
                            </div>
                        );
                    })}
                </div> */}
                <div className="tab-content">
                    {this.renderContent()}
                </div>
            </div>

        </>
        );
    }
}