import { ChangeEvent, useEffect, useState } from "react";
import { OptionTypes, ForecastType } from "../types";

const Keya = 'e5b128ed694209a7b00916f1fbf823ba';

const useForecast = () => {
    const [locInpt, setLocInpt] = useState<string>('');
    const [locOptions, setlocOptions] = useState<[]>([]);
    const [sub, setSub] = useState<OptionTypes | null>(null);
    const [forecast, setForecast] = useState<ForecastType | null>(null);
  
    const onLocInptChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocInpt(value);
      if (value === "") return
      getLocationCordAPI(value);
    }
  
    const getLocationCordAPI = (value: string) => {
      const weatherValue = value.trim();
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherValue}&limit=5&appid=${Keya}`)
        .then(res => res.json())
        .then(data => setlocOptions(data))
    }
  
    const getWeatherAPI = (lonLat: { lat: number; lon: number|undefined; }) => {
      const {lat, lon} = lonLat;
      
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Keya}&cnt=40`,)
        .then(res => res.json())
        .then((data) => {
            const dataList = data.list;
            let dailyWeather = [];
            if(dataList) {
              for (var i = 0; i < dataList.length; i+=8) {
                dailyWeather.push(dataList[i]);
              }
            }
            const foreCastData = {
              ...data.city,
              list: dailyWeather
          }
            console.log('data.list:', dailyWeather)
            setForecast(foreCastData)
        })
    }
  
    const onSelectLoc = (optItem: OptionTypes) => {
      setSub(optItem);
      console.log(optItem);
      const lonLat = {
        lat: optItem.lat,
        lon: optItem.lon
      }
      getWeatherAPI(lonLat);
    }
  
    useEffect(() => {
      if(sub) {
        setLocInpt(sub.name);
        setlocOptions([]);
      }
    },[sub]);

    return {
        locInpt,
        locOptions,
        forecast,
        onSelectLoc,
        onLocInptChange
    }
}

export default useForecast;