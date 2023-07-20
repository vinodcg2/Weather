import React from 'react'
import { ForecastType } from '../types';

type Props = {
    data: ForecastType
}

const Temprature = ({temp}:{temp:number}): JSX.Element => {
    return (
          <h4 className='forecast__temp-val'>
              {Math.round(temp)} <sup>0</sup>
          </h4>
      );
}

const getDaysName = (date:string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    const dayName = days[d.getDay()];
    return dayName;
  }


const Forecast = ({data}: Props): JSX.Element => {
    const todayForecast = data.list[0];
  return (
    <>
    <section className='forecast'>
        <div className="forecast__city">{data.name} (<em>{data.country}</em>)</div>
        <Temprature  temp={todayForecast.main.temp}  />
        <figure>
            <img alt={'weather-icon'} src={`http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}@4x.png`} />
            <figcaption>{todayForecast.weather[0].description}</figcaption>
        </figure>
        <div className="forecast__temp">
            <span>H:{Math.ceil(todayForecast.main.temp_max)}</span> 
            <span>L: {Math.floor(todayForecast.main.temp_min)}</span> 
        </div>
    </section>

    <section className='daily-forcast'>
        <ul>
            {data.list && data.list.map((item, i) => (
                <li key={i}>
                    <p>{getDaysName(item.dt_txt)}</p>
                    <figure>
                        <img
                        alt={item.weather[0].description}
                        title={item.weather[0].description}
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        />
                        <figcaption><Temprature temp={Math.round(item.main.temp)} /></figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    </section>
    </>
  )
}

export default Forecast;
