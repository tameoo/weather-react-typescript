import React, { useEffect, useState } from 'react';
import { fetchForecastWeatherCoords } from '../../services';
import {Highlight} from '../Highlight';
import {WeatherList} from '../WeatherList';
import {Spinner} from '../Spinner';

interface WeatherWrapperProps{
    coords: {
        lat: number | null,
        lon : number | null
    },
    toggleTemp: string
}

const WeatherWrapper:React.FC<WeatherWrapperProps> = ({coords, toggleTemp}) => {
    const [highlight, seHighlight] = useState<number>(0);
    const [forecastWeather, setForecastWeather] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            setForecastWeather(await fetchForecastWeatherCoords(coords));
            setLoading(false);
        }
        fetchData();
    },[coords]);

    const OnSetHighlight = (index: number) => {
        seHighlight(index);
    }
    
    const filterHighlight = (forecastWeather: any,highlight: number): any => {
        return forecastWeather?.list.filter((el: any, index: number ) => index === highlight);
    }

    return (
        isLoading ? (
            <Spinner /> 
        ) : forecastWeather ? (
            <>
                <WeatherList toggleTemp={toggleTemp} forecastWeather={forecastWeather} OnSetHighlight={OnSetHighlight}/>
                <Highlight forecastWeather={filterHighlight(forecastWeather,highlight)}/>
            </>
        ) : null
    );
}

export {WeatherWrapper};


    
