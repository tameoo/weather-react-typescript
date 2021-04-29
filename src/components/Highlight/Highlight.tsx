import React from 'react';
import { convertMilliseconds } from '../../helper';
import './Highlight.css';

interface IHighlight{
    highlight: any,
    color: string,
}

const Highlight: React.FC<IHighlight> = ({highlight, color}) => {
    return (
        <>
            <h2 className={`description-header ${color}`}>{convertMilliseconds(highlight[0]?.dt, 'long')}</h2>
            <ul className="weather-grid">
                <li className={`weather-grid-item ${color}`}>
                    <p className="weather-grid-subtitle">Wind status</p>
                    <p className="weather-grid-title mb0">{Math.round(highlight[0]?.speed)}<span>mph</span></p>
                    <div className="weather-wind">
                            <img className="weather-wind-arrow" src="images/compass.svg" alt="compass" 
                                    style={{transform: `rotate(${highlight[0]?.deg}deg)`}}/> 
                    </div>
                </li>
                <li className={`weather-grid-item ${color}`}>
                    <p className="weather-grid-subtitle">Humidity</p>
                    <p className="weather-grid-title">{highlight[0]?.humidity}<span>%</span></p>
                    <div className="weather-humidity">
                        <div className="limit" style={{width: `${highlight[0]?.humidity}%`}}></div>
                        <div className="upper">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </li>
                <li className={`weather-grid-item ${color}`}>
                    <p className="weather-grid-subtitle">Visibility</p>
                    <p className="weather-grid-title">{Math.round(highlight[0]?.gust || 20)}<span>miles</span></p>
                </li>
                <li className={`weather-grid-item ${color}`}>
                    <p className="weather-grid-subtitle">Air Pressure</p>
                    <p className="weather-grid-title">{highlight[0]?.pressure}<span>mb</span></p>
                </li>
            </ul>
        </>
    );
}

export { Highlight };