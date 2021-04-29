import React, { useState } from 'react';
import './ToogleBtn.css';

interface ToogleBtnProps{
    color: string
    onToggleTemp: (toggleValue: string) => void,
}

const ToogleBtn: React.FC<ToogleBtnProps> = ({color, onToggleTemp}) => {
    const [{celcius, fahrenheit}, setActive] = useState<{celcius: boolean;fahrenheit: boolean;}>({celcius: true, fahrenheit: false});
    
    const activeC = {celcius: true, fahrenheit: false};
    const activeF = {celcius: false, fahrenheit: true};

    const setCelcius = () => {
        setActive(activeC)
        onToggleTemp('celcius')
    }
    
    const setFahrenheit = () => {
        setActive(activeF)
        onToggleTemp('fahrenheit')
    }
    
    return (
        <div className="weather-toogle">
            <button className={`celcius ${celcius && 'active'} ${color}`} onClick={() => setCelcius()}>℃</button>
            <button className={`fahrenheit ${fahrenheit && 'active'} ${color}`} onClick={() => setFahrenheit()}>℉</button>
        </div>
    );
}

export {ToogleBtn};