import React, { useEffect, useState } from 'react';
import {ToogleBtn} from '../ToogleBtn';
import {WeatherNow} from '../WeatherNow';
import {SearchForm} from '../SearchForm';
import {WeatherWrapper} from '../WeatherWrapper';
import './Weather.css';

const Weather: React.FC = () => {
    const [coords, setCoords] = useState<{lat: number | null, lon:number | null}>({lat: null, lon: null});
    const [form, setForm] = useState<boolean>(true);
    const [toggleTemp, setToggleTemp] = useState<string>('celcius');

    useEffect(() => {
        OnHandleCoords()
    },[]);

    const OnHandleCoords = () => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lon: longitude});
        });
    }

    const OnHandleForm = () => {
        setForm(!form); 
    }

    const OnToggleTemp = (toggleValue: string) => {
        setToggleTemp(toggleValue);
    }

    const OnClickForm = (coords: any) => {
        setCoords(coords);
    }

    return (
        <div className="weather">
            <div className="weather-main">
                { 
                    form ? (
                        <WeatherNow coords={coords} 
                            toggleTemp={toggleTemp}
                            OnHandleForm={OnHandleForm} 
                            OnHandleCoords={OnHandleCoords} /> 
                    )
                    : <SearchForm OnHandleForm={OnHandleForm}
                                  OnClickForm={OnClickForm} />
                }
            </div>
            <div className="weather-description">
                <ToogleBtn OnToggleTemp={OnToggleTemp} />
                <WeatherWrapper coords={coords} toggleTemp={toggleTemp} />
            </div>
        </div>
    );
}

export { Weather };