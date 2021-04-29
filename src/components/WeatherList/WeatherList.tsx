import React from 'react';
import { toogleTemp, convertMilliseconds } from '../../helper';
import './WeatherList.css';

interface WeatherListProps{
    temperature: string,
    color: string,
    forecastWeather: any,
    onSetHighlight: (index: number) => void
}

const WeatherList: React.FC<WeatherListProps> = ({temperature, color, forecastWeather, onSetHighlight}) => {
    
    const getForecastItems= (forecasts: any[]):JSX.Element[] => {
        return forecasts.map((forecast, index) => {
            const dayTemp = toogleTemp(forecast.temp?.day,temperature);
            const nightTemp = toogleTemp(forecast.temp?.night,temperature);
            
            return (
                <li key={index} className={`weather-item ${color}`} onClick={() => onSetHighlight(index)}>
                    <p className="weather-title">{convertMilliseconds(forecast.dt)}</p>
                    <img className="weather-img" src={`images/${forecast.weather[0].icon}.svg`} alt="weather-forecast"/>
                    <div className="weather-tempature">
                        <span className="day">{dayTemp}</span>
                        <span className="night-opacity">{nightTemp}</span>
                    </div>
                </li>
            );
        })
    }
    
    return (
        <ul className="weather-list">
            { getForecastItems(forecastWeather.list.slice(0,5)) }
        </ul>
    );
}


export { WeatherList };