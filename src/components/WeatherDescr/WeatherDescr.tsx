import React, { useState } from 'react';
import { Highlight } from '../Highlight';
import { WeatherList } from '../WeatherList';
import { filterHighlight } from '../../helper';

interface IWeatherDescr{
    forecastWeather: any,
    color: string
    temperature: string
}

const WeatherDescr:React.FC<IWeatherDescr> = ({forecastWeather, temperature, color}) => {
    const [highlight, seHighlight] = useState<number>(0);

    const onSetHighlight = (index: number) => {
        seHighlight(index);
    }

    return (
        <>
            <WeatherList forecastWeather={forecastWeather}
                        temperature={temperature} 
                        color={color} 
                        onSetHighlight={onSetHighlight} />
            <Highlight highlight={filterHighlight(forecastWeather,highlight)} 
                        color={color} />
        </>
    );
}

export {WeatherDescr};


    
