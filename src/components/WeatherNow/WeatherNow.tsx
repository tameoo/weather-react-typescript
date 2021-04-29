import React from 'react';
import { toogleTemp, convertMilliseconds } from '../../helper';
import './WeatherNow.css';

interface IWeatherMain{
    currentWeather: any,
    temperature: string,
    color: string
    onHandleForm: () => void,
    onHandleCoords: () => void
}

const WeatherNow: React.FC<IWeatherMain> = ({currentWeather, temperature, color, onHandleForm, onHandleCoords}) => {

    let value = toogleTemp(currentWeather.main.temp, temperature);
    
    return (
        <>
            <div className="navigation">
                <button className={`navigation-search ${color}`} onClick={() => onHandleForm()}>Search for places</button>
                <button className={`navigation-geo ${color}`} onClick={() => onHandleCoords()}><i className="fas fa-location"></i></button>
            </div>
            <div className="weather-forecast">
                <img src={`images/${currentWeather?.weather[0]?.icon}.svg`} alt="weather-forecast" className="forecast-center"/>
            </div>
            <div className={`weather-header ${color}`}>{value.substr(0,value.length - 1)}
                <span>{value.substr(value.length - 1)}</span>
            </div>
            <div className={`weather-subheader ${color}`}>{currentWeather?.weather[0]?.description}</div>
            <div className={`weather-date ${color}`}>
                <span>Today</span>
                <span className="dot">•</span>
                <span>{convertMilliseconds(currentWeather?.dt)}</span>
            </div>
            <div className={`weather-place ${color}`}>
                <i className="fas fa-map-marker"></i>
                {currentWeather?.name}
            </div>
        </>
    );
}

export { WeatherNow };