import { ChangeEvent, useEffect, useState } from "react";
import { OptionTypes, ForecastType, LonLat } from "../types";
import { SellingService } from "../services/weatherService";

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
      SellingService.getCordinate(weatherValue)
      .then(res => {
        console.log('res:', res)
        const data = res.data;
        setlocOptions(data)
      })
      .catch(error => {
        console.warn(error) 
      });
    }
  
    const getWeatherAPI = (lonLat: LonLat) => {
      SellingService.getForecast(lonLat)
        .then(res => {
          const data = res.data;
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
          setForecast(foreCastData)

        })
        .catch(error => {
          console.warn(error) 
        });
    }
  
    const onSelectLoc = (optItem: OptionTypes) => {
      setSub(optItem);
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