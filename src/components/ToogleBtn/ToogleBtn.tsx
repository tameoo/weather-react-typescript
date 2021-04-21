import React, { useState } from 'react';
import './ToogleBtn.css';

interface ToogleBtnProps{
    OnToggleTemp: (toggleValue: string) => void
}

const ToogleBtn: React.FC<ToogleBtnProps> = ({OnToggleTemp}) => {
    const [{celcius, fahrenheit}, setActive] = useState<{celcius: boolean;fahrenheit: boolean;}>({celcius: true, fahrenheit: false});
    
    const activeC = {celcius: true, fahrenheit: false};
    const activeF = {celcius: false, fahrenheit: true};

    const setCelcius = () => {
        setActive(activeC)
        OnToggleTemp('celcius')
    }
    
    const setFahrenheit = () => {
        setActive(activeF)
        OnToggleTemp('fahrenheit')
    }
    
    return (
        <div className="weather-toogle">
            <button className={`celcius ${celcius && 'active'}`} onClick={() => setCelcius()}>℃</button>
            <button className={`fahrenheit ${fahrenheit && 'active'}`} onClick={() => setFahrenheit()}>℉</button>
        </div>
    );
}

export {ToogleBtn};