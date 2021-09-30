import React from 'react'
import axios from 'axios'
import '../index.css'
import { Link } from "react-router-dom";

class Hourly extends React.Component {
    state = {
        response: [],

    }

    async componentDidMount() {


        const city_value = this.props.match.params.city;
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=28193ed4b743490692a92524212408&q=${city_value}&days=3`)
        this.setState({
            response: response.data.forecast.forecastday[this.props.match.params.id].hour,

        })
        //console.log(response.data)
        //console.log(response.data.forecast.forecastday[this.props.match.params.id].hour)
    }
    render() {

        return (

            <div className="container">
                <Link to="/"><button className="btn btn-primary btn-lg" style={{ display: "block", width: "100%", marginBottom: "10px" }}>Homepage</button> </Link>
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {this.state.response.map((time, i) => (

                        <div className="col-lg-3" key={i}>
                            <div className="hourly-gun-card p-3 border bg-light" >
                                <img src={time.condition.icon} style={{ height: 105, width: 105, display: "block", margin: "0 auto" }} className="card-img-top" alt="..." />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{time.time.split(" ")[1]}</h5>
                                    <p className="card-text">{time.condition.text}</p>
                                    <p className="card-text">The felt temperature: {time.feelslike_c}°C</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default Hourly

