
const apiKeyWeather = 'd701466e6f81830ea1596b7e2038a077';
const apiKeyPosition = 'fbc13c10bd85447d8b05a6fd4f167c9a';

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