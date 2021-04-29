import React, { useState } from 'react';
import { WeatherNow } from '../WeatherNow/WeatherNow';
import { SearchForm } from '../SearchForm';

interface IWeatherMain{
    currentWeather: any,
    temperature: string,
    color: string,
    onHandleCoords: () => void,
    onClickItem: (value: any) => void
}

const WeatherMain: React.FC<IWeatherMain> = ({currentWeather, temperature, color, onClickItem, onHandleCoords}) => {
    const [form, setForm] = useState<boolean>(true);

    const onHandleForm = () => {
        setForm(!form); 
    }

    return (
        form ? (
            <WeatherNow currentWeather={currentWeather} 
                        temperature={temperature}
                        color={color}
                        onHandleForm={onHandleForm} 
                        onHandleCoords={onHandleCoords} /> 
        ) : ( 
            <SearchForm color={color}
                        onHandleForm={onHandleForm}
                        onClickItem={onClickItem} />
        )
    );
}

export {WeatherMain};