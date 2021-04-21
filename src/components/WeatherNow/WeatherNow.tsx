import React, { useEffect, useState } from 'react';
import { fetchCurrentWeatherCoords } from '../../services';
import { toogleTemp, convertMilliseconds } from '../../helper';
import {Spinner} from '../Spinner';
import './WeatherNow.css';

interface WeatherNowProps{
    coords: {
        lat: number | null,
        lon : number | null
    }
    toggleTemp: string,
    OnHandleForm: () => void,
    OnHandleCoords: () => void
}

const WeatherNow: React.FC<WeatherNowProps> = ({coords,toggleTemp,OnHandleForm,OnHandleCoords}) => {
    const [currentWeather, setCurrentWeather] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setCurrentWeather(await fetchCurrentWeatherCoords(coords));
            setLoading(false);
        }
        fetchData();
    },[coords]);

    let value: string = '';

    if(currentWeather){
        value = toogleTemp(currentWeather?.main?.temp, toggleTemp);
    }
    
    return (
        isLoading ?
            <Spinner /> 
        :  currentWeather ? (
            <>
                <div className="navigation">
                    <button className="navigation-search" onClick={() => OnHandleForm()}>Search for places</button>
                    <button className="navigation-geo" onClick={() => OnHandleCoords()}><i className="fas fa-location"></i></button>
                </div>
                <div className="weather-forecast">
                    <img src={`images/${currentWeather?.weather[0]?.icon}.svg`} alt="weather-forecast" className="forecast-center"/>
                </div>
                <div className="weather-header">{value.substr(0,value.length - 1)}
                    <span>{value.substr(value.length - 1)}</span>
                </div>
                <div className="weather-subheader">{currentWeather?.weather[0]?.description}</div>
                <div className="weather-date">
                    <span>Today</span>
                    <span className="dot">•</span>
                    <span>{convertMilliseconds(currentWeather?.dt)}</span>
                </div>
                <div className="weather-place">
                    <i className="fas fa-map-marker"></i>
                    {currentWeather?.name}
                </div>
            </>
        ) : null
    );
}

export {WeatherNow};