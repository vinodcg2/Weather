import axios from 'axios';
import { Vendor_OpenWeather, Weather_API } from '../js/config';
import { LonLat } from '../types';

export class SellingService {
    public static async getCordinate(weatherValue: string) {
        let weatherURL: string = `${Vendor_OpenWeather}/geo/1.0/direct?q=${weatherValue}&limit=5&appid=${Weather_API}`
        return await axios.get(weatherURL)
    }
    public static async getForecast(lonLat: LonLat) {
        const {lat, lon} = lonLat;
        let weatherURL: string = `${Vendor_OpenWeather}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Weather_API}&cnt=40`
        return await axios.get(weatherURL)
    }

}