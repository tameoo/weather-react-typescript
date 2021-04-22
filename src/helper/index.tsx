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

const filterHighlight = (forecastWeather: any,highlight: number): any => {
    return forecastWeather?.list.filter((el: any, index: number ) => index === highlight);
}

export{
    filterHighlight,
    toogleTemp,
    convertMilliseconds
}