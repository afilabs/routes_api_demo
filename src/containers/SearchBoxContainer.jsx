import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../redux/reducers/mapReducer';
import SearchBox from '../components/SearchBox';
import { getDirections } from '../services/google';
import { TRAVEL_MODES } from '../constants';

const SearchBoxContainer = () => {
  const { travelMode, routes, origin, destination } = useSelector((state) => state.map.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDirections = async () => {
      if (origin && destination && Object.keys(origin).length && Object.keys(destination).length) {
        try {
          console.log('Fetching directions:', { origin, destination });
          const newRoutes = {};
          for (const mode of TRAVEL_MODES) {
            const res = await getDirections({
              origin: { address: origin.formattedAddress },
              destination: { address: destination.formattedAddress },
              travelMode: mode,
              routingPreference: 'traffic_aware',
              extraComputations: ['TRAFFIC_ON_POLYLINE'],
            });
            newRoutes[mode] = res?.routes || [];
          }
          dispatch(setData({ routes: newRoutes }));
        } catch (error) {
          console.error('Failed to fetch directions:', error);
          dispatch(setData({ routes: [], error: 'Failed to fetch directions' }));
        }
      }
    };

    fetchDirections();
  }, [origin, destination, dispatch]);

  const handleAddressChange = (type, address) => {
    dispatch(
      setData({
        [type]: {
          name: address.name,
          formattedAddress: address.formatted_address,
          position: {
            lat: address.geometry.location.lat(),
            lng: address.geometry.location.lng(),
          },
          place_id: address.place_id,
        },
      }),
    );
  };

  return (
    <SearchBox
      travelMode={travelMode}
      routes={routes}
      onTravelModeChange={(mode) => dispatch(setData({ travelMode: mode }))}
      onOriginAddressChange={(address) => handleAddressChange('origin', address)}
      onDestinationAddressChange={(address) => handleAddressChange('destination', address)}
    />
  );
};

export default SearchBoxContainer;
