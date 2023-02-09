import React, { useState, useEffect } from 'react'


export const Form = () => {

    const [weatherData, setWeatherData] = useState();

    const [value, setValue] = useState();
    const [inpvalue, setInpValue] = useState();
    const [data, setData] = useState();
    const [date, setDate] = useState();

    const baseUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';
    const apiKey = 'b9fd81042ae048bc2e5a4b72d0e66e54';
    const base = "https://api.openweathermap.org/data/2.5/";

    function dateBuilder(d) {
        let months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December",
        ];
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    useEffect(() => {
        setData();
        const firstApiCalling = async (value) => {
            try {
                const response = await fetch(
                    `${base}weather?q=${value}&units=metric&APPID=${apiKey}`,
                );
                const json = await response.json();
                setWeatherData(json)
                setDate(dateBuilder(new Date()))
            } catch (err) {
                alert('Enter More Precise Location');
                window.location.reload(false)
            }
        };
        if (value) {
            firstApiCalling(value);
        }
    }, [value]);

    useEffect(() => {
        const apiCalling = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}`,
                );
                const json = await response.json();
                setData(json.list[0].components)
            } catch (err) {
                alert('Enter More Precise Location');
                window.location.reload(false)
            }
        };
        if (weatherData) {
            apiCalling(weatherData);
        }
    }, [weatherData]);
 
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            setValue(inpvalue);
        }
    };

    return (
        <div>
            <video autoPlay loop muted id="vid">
                <source src="/assets\globdarkandlight.mp4" type ="video/mp4"/>
            </video>
            <div class="app-wrap">
                <header>
                    <h1>Air Quality Index Tracker</h1>
                    <input type="text" onChange={(e) => {setInpValue(e.target.value)}} value={inpvalue} onKeyDown={handleKeyDown} placeholder="Enter a Location..." class="search" id="search-box" />
                </header>
                <div class="location">
                    <div class="city">{weatherData ? <>{weatherData.name}, {weatherData.sys.country}</> : <>Enter a Location</>}</div>
                    <div class="date">{date? <>{date}</> : <>Current Date</>}</div>
                </div>
                <div class="coordinates">
                    <div class="lat">Lat:- {weatherData? <>{weatherData?.coord.lat}</> : <>TBD</>}</div>
                    <div class="lon">Long:- {weatherData? <>{weatherData?.coord.lon}</> : <>TBD</>}</div>
                </div>
                <hr/>
                <div class="weather">
                    <span id="temp">{weatherData? <>{weatherData.main.temp}</> : <>TBD&deg;C</>}</span>
                </div>
                <hr/>
                <div class="parameters">
                    Air Quality Parameters
                </div>
                <hr/>
                <div class="air-quality">
                <div class="air-parameters">
                    <div class="o3">Ozone(o3)</div>
                    <hr/>
                    <div class="co">CO</div>
                    <hr/>
                    <div class="s02">SO2</div>
                    <hr/>
                    <div class="n02" >NO2</div>
                    <hr/>
                    <div class="pm10">PM10</div>
                    <hr/>
                    <div class="pm25">PM2.5</div>
                    <hr/>
                </div>
                <div class = "last-update">
                    <div class="o3-time">last-update</div>
                    <hr/>
                    <div class="co-time">last-update</div>
                    <hr/>
                    <div class="s02-time">last-update</div>
                    <hr/>
                    <div class="n02-time">last-update</div>
                    <hr/>
                    <div class="pm10-time">last-update</div>
                    <hr/>
                    <div class="pm25-time">last-update</div>
                    <hr/>
                </div>
                <div class="parameters-options">
                    <div class="o3-value">{data? <>{data.o3}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                    <div class="co-value">{data? <>{data.co}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                    <div class="so2-value">{data? <>{data.so2}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                    <div class="no2-value">{data? <>{data.no2}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                    <div class="pm10-value">{data? <>{data.pm10}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                    <div class="pm25-value">{data? <>{data.pm2_5}</> : <>TBD</>} µg/m³</div>
                    <hr/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Form
