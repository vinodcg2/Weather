export interface OptionTypes {
    name: string;
    state: string;
    lat: number;
    lon?: number;
}

export interface ForecastType {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    list: [{
        dt_txt: string;
        dt: number;
        clouds: {
            all: number;
        }
        main: {
            feels_like: number
            humidity: number
            pressure: number
            temp: number
            temp_max: number
            temp_min: number
        }
        pop:number;
        visibility:number;
        weather: [{
            description: string;
            icon: string;
            id: number; 
            main: string;
        }]
        wind: {
            deg: number;
            gust: number;
            speed: number;
        }

    }]


}
