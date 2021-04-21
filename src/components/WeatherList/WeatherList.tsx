import React from 'react';
import { toogleTemp, convertMilliseconds } from '../../helper';
import './WeatherList.css';

interface WeatherListProps{
    toggleTemp: string,
    forecastWeather: any,
    OnSetHighlight: (index: number) => void
}

const WeatherList: React.FC<WeatherListProps> = ({toggleTemp, forecastWeather, OnSetHighlight}) => {
    
    const getForecastItems= (forecasts: any[]):JSX.Element[] => {
        return forecasts?.map((forecast, index) => {
            return (
                <li key={index} className="weather-item" onClick={() => OnSetHighlight(index)}>
                    <p className="weather-title">{convertMilliseconds(forecast?.dt)}</p>
                    <img className="weather-img" src={`images/${forecast?.weather[0].icon}.svg`} alt="weather-forecast"/>
                    <div className="weather-tempature">
                        <span className="day">{toogleTemp(forecast?.temp?.day,toggleTemp)}</span>
                        <span className="night">{toogleTemp(forecast?.temp?.night,toggleTemp)}</span>
                    </div>
                </li>
            );
        })
    }
    
    return (
        <ul className="weather-list">
            {getForecastItems(forecastWeather?.list?.slice(0,5))}
        </ul>
    );
}


export {WeatherList};