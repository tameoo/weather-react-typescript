
const apiKeyWeather = '8cfcb5c748e9642898e43288cc10f915';
const apiKeyPosition = '49868d4ba8e64bc0833086e66f72dfc5';

const fetchCurrentWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    const response = await fetch(`http://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`)
    
    if(!response.ok) {
        throw new Error('Response is not correct to openweather API');
    }
    
    return await response.json();
}

const fetchForecastWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    const response = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`)

    if(!response.ok) {
        throw new Error('Response is not correct to openweather API');
    }
    
    return await response.json();
}

const getCoordsByName = async (name: string) => {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${name}&apiKey=${apiKeyPosition}`)

    if(!response.ok) {
        throw new Error('Response is not correct to openweather API');
    }
    
    return await response.json();
}

export{
    fetchCurrentWeatherCoords,
    fetchForecastWeatherCoords,
    getCoordsByName,
}
