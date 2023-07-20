import { ChangeEvent } from 'react';
import { OptionTypes } from '../types';

interface Props {
    locInpt: string;
    onLocInptChange: (e: ChangeEvent<HTMLInputElement>) => void;
    locOptions: OptionTypes[];
    onSelectLoc: (locOpt: OptionTypes) => void
}

const SearchWeather = (props: Props): JSX.Element => {
  return (
    <div className="weather">
      <div className="weather weather__search-bar">
        <h5>Weather Forecast</h5>
        <input onChange={props.onLocInptChange} value={props.locInpt} type="text" placeholder="Search location..." />
      </div>
        
      <ul className="weather--list-group">
        {props.locOptions && props.locOptions.map((optItem: OptionTypes) => (
          <li 
          key={optItem.lat}
          onClick={() => props.onSelectLoc(optItem)}>{optItem.name}, {optItem.state}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchWeather;