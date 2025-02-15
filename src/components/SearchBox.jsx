import React from 'react';
import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import { TRAVEL_MODES } from '../constants';
import { formatDuration } from '../services/time';
import Image from '../images';

import './SearchBox.scss';

const SearchBox = ({ routes, travelMode, onTravelModeChange, onOriginAddressChange, onDestinationAddressChange }) => {
  return (
    <div className="search-box">
      <div className="travel-mode-filter-btns">
        {TRAVEL_MODES.map((mode) => {
          const duration = formatDuration(routes[mode]?.[0]?.duration);
          return (
            <button key={mode} className={travelMode === mode ? 'active' : ''} onClick={() => onTravelModeChange(mode)}>
              <Image type={mode} />
              {duration && <span>{duration}</span>}
            </button>
          );
        })}
      </div>
      <div className="input-address-group">
        <Image type="ThreeDot" />
        <PlaceAutocompleteInput onPlaceSelect={onOriginAddressChange} />
        <PlaceAutocompleteInput onPlaceSelect={onDestinationAddressChange} />
      </div>
    </div>
  );
};

export default SearchBox;
