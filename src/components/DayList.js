
import React from 'react'
import {

    Link
} from "react-router-dom";
import '../index.css'

class DayList extends React.Component {


    state = {
        city_name: ""
    }

    componentDidMount() {
        this.setState({
            city_name: this.props.city
        })

    }


    render() {



        return (
            <div>


                <div className="container">
                    <h2 className="text-center city-info">{this.props.city}, {this.props.country}, {this.props.localtime} </h2>
                    <div className="d-flex justify-content-around row">
                        {this.props.weather.map((day, i) => (

                            <div className="col-lg-2 gun-card" key={i} >
                                <Link to={`/${this.props.city}/${i}`}>
                                    <div className="card shadow-sm" style={{ border: "solid 2px", borderRadius: "5%" }}>
                                        <img src={day.day.condition.icon} className="card-img-top" style={{ height: 105, width: 105, margin: "0 auto" }} alt="..." />
                                        <div className="d-flex flex-column card-body">
                                            <h4 className="card-title text-center">{day.date.split('-').reverse().join('/')}</h4>
                                            <hr />
                                            <h6 className="card-title text-center">{day.day.condition.text}</h6>
                                            <p className="card-text text-center">Avarage Temperature: {day.day.avgtemp_c} °C</p>
                                            <p className="card-text text-center">Maximum Temperature: {day.day.maxtemp_c} °C</p>
                                            <p className="card-text text-center">Minimum Temperature: {day.day.mintemp_c} °C</p>
                                            <p className="card-text text-center">Avarage Humidity: %{day.day.avghumidity} </p>
                                            <p className="card-text text-center">Maximum Wind: {day.day.maxwind_kph} km/hour </p>
                                        </div>



                                    </div>
                                </Link>
                            </div>

                        )

                        )}




                    </div>
                </div>

            </div>

        )
    }
}

export default DayList;