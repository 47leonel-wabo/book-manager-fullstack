import React, { Component } from "react";

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            description: "",
            icon: "",
            city: "",
            isLoading: true,
        };
    }

    componentDidMount() {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=Douala&units=Metric&APIkey=25c23a283f16623aa8794ca8e0f81adf`
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    city: data.name,
                    isLoading: false,
                });
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { icon, temp, description, isLoading, city } = this.state;
        const imgIcon = `http://openweathermap.org/img/w/${icon}.png`;
        if (isLoading) {
            return (
                <>
                    <span>Loading...</span>
                </>
            );
        } else {
            return (
                <>
                    <div className="weather-app">
                        <section
                            style={{
                                width: "200px",
                                display: "flex",
                                flexDirection: "column",
                                margin: "0 auto",
                            }}
                        >
                            <img
                                src={imgIcon}
                                alt="Weather icon"
                                style={{ width: "100px", height: "100px" }}
                            />
                            <h3>{city}</h3>
                            <span>Temperature: {temp}</span>
                            <span>{description}</span>
                        </section>
                    </div>
                </>
            );
        }
    }
}

export default WeatherApp;
