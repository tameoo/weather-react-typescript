import React, { useEffect, useState } from 'react';
import {ToogleBtn} from '../ToogleBtn';
import {WeatherNow} from '../WeatherNow';
import {SearchForm} from '../SearchForm';
import {WeatherDescr} from '../WeatherDescr';
import { getCoordsByName } from '../../services';
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

    const OnClickForm = (name: string) => {
        const fetchData = async () => {
            const {latitude, longitude} = (await getCoordsByName(name)).data[0];
            setCoords( {lat: latitude, lon: longitude});
        }
        fetchData();
    }

    return (
        <div className="weather">
            <div className="weather-main">
                {form ? <WeatherNow 
                            coords={coords} 
                            toggleTemp={toggleTemp}
                            OnHandleForm={OnHandleForm} 
                            OnHandleCoords={OnHandleCoords} /> 
                      : <SearchForm OnHandleForm={OnHandleForm}
                                    OnClickForm={OnClickForm}/>}
            </div>
            <div className="weather-description">
                <ToogleBtn OnToggleTemp={OnToggleTemp} />
                <WeatherDescr coords={coords} toggleTemp={toggleTemp} />
            </div>
        </div>
    );
}

export { Weather };