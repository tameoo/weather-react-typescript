import React from 'react';
import { convertMilliseconds } from '../../helper';
import './Highlight.css';

interface HighlightProps{
    forecastWeather: any
}

const Highlight: React.FC<HighlightProps> = ({forecastWeather}) => {
    return (
        <>
            <h2 className="description-header">{convertMilliseconds(forecastWeather[0]?.dt, 'long')}</h2>
            <ul className="weather-grid">
                <li className="weather-grid-item">
                    <p className="weather-grid-subtitle">Wind status</p>
                    <p className="weather-grid-title">{Math.round(forecastWeather[0]?.speed)}<span>mph</span></p>
                    <div className="weather-wind">
                            <img className="weather-wind-arrow" src="images/compass.svg" alt="compass" style={{transform: `rotate(${forecastWeather[0]?.deg}deg)`}}/> 
                    </div>
                </li>
                <li className="weather-grid-item">
                    <p className="weather-grid-subtitle">Humidity</p>
                    <p className="weather-grid-title">{forecastWeather[0]?.humidity}<span>%</span></p>
                    <div className="weather-humidity">
                        <div className="limit" style={{width: `${forecastWeather[0]?.humidity}%`}}></div>
                        <div className="upper">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </li>
                <li className="weather-grid-item">
                    <p className="weather-grid-subtitle">Visibility</p>
                    <p className="weather-grid-title">{Math.round(forecastWeather[0]?.gust || 20)}<span>miles</span></p>
                </li>
                <li className="weather-grid-item">
                    <p className="weather-grid-subtitle">Air Pressure</p>
                    <p className="weather-grid-title">{forecastWeather[0]?.pressure}<span>mb</span></p>
                </li>
            </ul>
        </>
    );
}

export {Highlight};