
const apiKey = 'd701466e6f81830ea1596b7e2038a077';

const fetchCurrentWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    if(lat && lon){
        const response = await fetch(`http://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        
        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

const fetchForecastWeatherCoords = async ({lat, lon}: {lat: number | null,lon: number | null}) => {
    if(lat && lon){
        const response = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`)

        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

const getCoordsByName = async (name: string) => {
    if(name){
        const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=f59c9e1719d53ed060e3c684ab5bb3f7&query=${name}`)

        if(!response.ok){
            throw new Error('Response is not correct to openweather API');
        }
        
        return await response.json();
    }
}

const toogleTemp = (value: number, prop: string): string => {
    switch(prop){
        case 'celcius':
            value = value - 273.15;
            return `${Math.round(value)}℃`;
        case 'fahrenheit':
            value = ((value - 273.15) * 1.8) + 32;
            return `${Math.round(value)}℉`;
        default: 
            return `${Math.round(value)}℃`;
    }
}

const convertMilliseconds = (milles: number, option: string = 'short') => {
    const date = new Date(+`${milles}000`);

    if(option === 'long'){
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long'
        }).format(date);  
    }

    return new Intl.DateTimeFormat('en-US', {
                weekday: 'short', day: 'numeric', month: 'short',
    }).format(date);
}

export{
    fetchCurrentWeatherCoords,
    fetchForecastWeatherCoords,
    getCoordsByName,
    toogleTemp,
    convertMilliseconds
}