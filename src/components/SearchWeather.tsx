import React, { ChangeEvent } from 'react';
import { OptionTypes } from '../types';

interface Props {
    locInpt: string;
    onLocInptChange: (e: ChangeEvent<HTMLInputElement>) => void;
    locOptions: OptionTypes[];
    onSelectLoc: (locOpt: OptionTypes) => void;
}

const SearchWeather = ({ locInpt, onLocInptChange, locOptions, onSelectLoc }: Props): JSX.Element => {
    return (
        <div className="weather">
            <div className="weather__search-bar">
                <h5>Weather Forecast</h5>
                <input 
                    onChange={onLocInptChange} 
                    value={locInpt} 
                    type="text" 
                    placeholder="Search location..." 
                />
            </div>
            
            <ul className="weather__list-group">
                {locOptions?.map((optItem) => (
                    <li 
                        key={optItem.lat} 
                        onClick={() => onSelectLoc(optItem)}
                        className="weather__list-item"
                    >
                        {optItem.name}, {optItem.state}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchWeather;
