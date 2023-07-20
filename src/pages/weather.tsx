import Forecast from '../components/Forecast';
import SearchWeather from '../components/SearchWeather';
import useForecast from '../hooks/useForecast';


const Weather = (): JSX.Element => {
  const { locInpt, locOptions, forecast, onSelectLoc, onLocInptChange } = useForecast();
  return (
    <div className="weather">
      
      <SearchWeather
          locInpt={locInpt}
          onLocInptChange={onLocInptChange}
          locOptions={locOptions}
          onSelectLoc={onSelectLoc} />

      {forecast && (
        <Forecast data={forecast} />
      )}
      
    </div>
  )
}

export default Weather;