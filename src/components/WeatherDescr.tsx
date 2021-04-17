import React, { useEffect, useState } from 'react';
import { fetchForecastWeatherCoords } from '../services';
import Highlight from './Highlight';
import WeatherList from './WeatherList';
import Spinner from './Spinner';

interface WeatherDescrProps{
    coords: {
        lat: number | null,
        lon : number | null
    },
    toggleTemp: string
}

const WeatherDescr:React.FC<WeatherDescrProps> = ({coords, toggleTemp}) => {
    const [highlight, seHighlight] = useState<number>(0);
    const [forecastWeather, setForecastWeather] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setForecastWeather(await fetchForecastWeatherCoords(coords));
        }
        fetchData();
    },[coords]);

    const OnSetHighlight = (index: number) => {
        seHighlight(index);
    }
    
    const filterHighlight = (forecastWeather: any,highlight: number): any => {
        return forecastWeather?.list.filter((el: any, index: number ) => index === highlight);
    }

    if(forecastWeather){
        return (
            <>
                <WeatherList toggleTemp={toggleTemp} forecastWeather={forecastWeather} OnSetHighlight={OnSetHighlight}/>
                <Highlight forecastWeather={filterHighlight(forecastWeather,highlight)}/>
            </>
        );
    } else {
        return <Spinner />
    }
}

export default WeatherDescr;


    
