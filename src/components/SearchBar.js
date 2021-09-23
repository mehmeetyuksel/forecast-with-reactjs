import React from 'react'
import DayList from '../components/DayList'
import logo from '../img/logo.png'
import axios from 'axios'
import '../index.css'

let textInput = React.createRef();
class SearchBar extends React.Component {



    state = {
        country: "",
        city_value: "",
        weather: [],
        localtime: "",
        init: 0
    }



    onSubmit = (e) => {
        e.preventDefault();
        //console.log(textInput.current.value)
        this.onChange(textInput.current.value)
        textInput.current.value = ""
    }

    onChange = async (city_value) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=28193ed4b743490692a92524212408&q=${city_value}&days=3`)
        //console.log(response.data.location.name)
        this.setState({
            weather: response.data.forecast.forecastday,
            localtime: response.data.location.localtime.split(" ")[1],
            country: response.data.location.country,
            city_value: response.data.location.name
        })

    }

    handleKeyPress = async (e) => {

        if (e.key === "Enter") {
            //console.log(e.target.value)
            e.preventDefault();
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=28193ed4b743490692a92524212408&q=${e.target.value}&days=3`)
            //console.log(response.data.location.name)
            this.setState({
                weather: response.data.forecast.forecastday,
                localtime: response.data.location.localtime.split(" ")[1],
                country: response.data.location.country,
                city_value: response.data.location.name
            })
            e.target.value = "";
        }
    }


    async componentDidMount() {
        const response = await fetch("https://ip-geo-location.p.rapidapi.com/ip/check?format=json", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
                "x-rapidapi-key": "a72edcbfaamsh96bf1fc7aee8f23p1c27fajsn74d1a5ffa4a4"
            }
        })
        const initial = await response.json();
        //console.log(initial.city.name)
        this.setState({
            city_value: initial.city.name,
            country: initial.country.name,
            init: 1

        })
       // console.log(initial)

        const response2 = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=28193ed4b743490692a92524212408&q=${this.state.city_value}&days=3`)

        this.setState({
            weather: response2.data.forecast.forecastday,
            localtime: response2.data.location.localtime.split(" ")[1],
            //country: response2.data.location.country

        })
    }




    render() {


        return (this.state.init ?
            <div>

                <div className="text-center">
                    <img src={logo} className="rounded" alt="..." />
                </div>
                <form>
                    <input ref={textInput}  type="text" className="search-bar" placeholder="Write the city name to see its forecast" onFocus={(e) => { e.target.placeholder = "" }} onBlur={(e) => { e.target.placeholder = "Write the city name to see its forecast" }} onKeyPress={this.handleKeyPress} />
                </form>
                <button style={{ display: "block", margin: "1rem auto" }} className="search-button" onClick={this.onSubmit}><span>Look For It!</span></button>

                <DayList city={this.state.city_value} weather={this.state.weather} localtime={this.state.localtime} country={this.state.country} />
            </div> : <div></div>

        )
    }
}

export default SearchBar