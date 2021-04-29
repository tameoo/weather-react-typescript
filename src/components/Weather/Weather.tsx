import React, { useCallback, useEffect, useState } from 'react';
import { ToogleBtn } from '../ToogleBtn';
import { WeatherMain } from '../WeatherMain';
import { WeatherDescr } from '../WeatherDescr';
import { fetchCurrentWeatherCoords, fetchForecastWeatherCoords } from '../../services';
import { Spinner } from '../Spinner';
import './Weather.css';

const Weather: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [currentWeather, setCurrentWeather] = useState<any>(null);
    const [forecastWeather, setForecastWeather] = useState<any>(null);
    const [temperature, setTemperature] = useState<string>('celcius');
    const [color, setColor] =useState<string>('');
    
    const getCoords = useCallback(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            const coords = {lat: latitude, lon: longitude};
            fetchData(coords);
        });
    },[]);
    
    useEffect(() => {
        getCoords();
    },[getCoords]);
    
    const fetchData = async (coords: any) => {
        setLoading(true);
        setCurrentWeather( await fetchCurrentWeatherCoords(coords) );
        setForecastWeather( await fetchForecastWeatherCoords(coords) );
        const {dt, sys: {sunrise, sunset}} = (await fetchCurrentWeatherCoords(coords));
        
        if(sunrise > dt || sunset < dt) {
            setColor('night');
        } else {
            setColor('');
        }

        setLoading(false);
    }

    const setClickItem = (coords: any) => {
        fetchData(coords);
    }
    
    const setTemperatureContext = (toggleValue: string) => {
        setTemperature(toggleValue);
    }

    return (
        isLoading ? (
            <Spinner/>
            ) : (
                <div className={`app ${color}`}>
                <div className="weather">
                    <div className={`weather-main ${color}`}>
                        <WeatherMain  
                                currentWeather={currentWeather}
                                color={color} 
                                temperature={temperature}
                                onHandleCoords={getCoords}
                                onClickItem={setClickItem} />
                    </div>
                    <div className={`weather-description ${color}`}>
                        <ToogleBtn color={color} 
                                    onToggleTemp={setTemperatureContext} />
                        <WeatherDescr forecastWeather={forecastWeather}
                                    temperature={temperature} 
                                    color={color} />
                    </div>
                </div>
            </div>
        )
    );
}

export { Weather };