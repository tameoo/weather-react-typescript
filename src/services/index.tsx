
const apiKeyWeather = 'd701466e6f81830ea1596b7e2038a077';
const apiKeyPosition = '3ae7c7b2dd1f58c6402da03860317237';

const fetchCurrentWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    if(lat && lon){
        const response = await fetch(`http://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`)
        
        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

const fetchForecastWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    if(lat && lon){
        const response = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`)

        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

const getCoordsByName = async (name: string) => {
    if(name){
        const response = await fetch(`https://api.positionstack.com/v1/forward?access_key=${apiKeyPosition}&query=${name}`)

        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

export{
    fetchCurrentWeatherCoords,
    fetchForecastWeatherCoords,
    getCoordsByName,
}