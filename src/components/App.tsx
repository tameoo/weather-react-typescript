import React from 'react';
import Weather from './Weather';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="app-container">
                <Weather />
            </div>
        </div>
    );
}

export default App;