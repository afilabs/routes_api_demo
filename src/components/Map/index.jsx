import React, { useMemo, useState } from 'react';
import { useMap, Map as Gmap, InfoWindow } from '@vis.gl/react-google-maps';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../../constants';
import Marker from './Marker';
import Polyline, { InfoWindow as PolylineInfoWindow } from './Polyline';
import MapHandler from './MapHandler';

const Map = ({ origin, destination, travelMode, routes }) => {
  const map = useMap();
  const [infoWindow, setInfoWindow] = useState(null);
  const [activeRoute, setActiveRoute] = useState(0);

  const stops = useMemo(() => {
    const stopsArray = [];
    if (origin?.position) stopsArray.push(origin);
    if (destination?.position) stopsArray.push(destination);
    return stopsArray;
  }, [origin, destination]);

  const handlePolylineClick = (event, route, routeIndex) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setActiveRoute(routeIndex);
    setInfoWindow({
      position,
      content: <PolylineInfoWindow route={route} travelMode={travelMode} />,
    });
  };

  return (
    <Gmap
      mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
      defaultZoom={DEFAULT_MAP_ZOOM}
      defaultCenter={DEFAULT_MAP_CENTER}
      gestureHandling="greedy"
      disableDefaultUI={true}
    >
      <MapHandler map={map} stops={stops} />
      {origin && <Marker type="OriginMarker" position={origin.position} />}
      {destination && <Marker type="DestinationMarker" position={destination.position} />}
      {routes.map((route, routeIndex) => (
        <Polyline
          key={`polyline-${routeIndex}`}
          route={route}
          activeRoute={activeRoute}
          routeIndex={routeIndex}
          onClick={handlePolylineClick}
        />
      ))}
      {infoWindow && (
        <InfoWindow
          key={infoWindow.position.lat + ',' + infoWindow.position.lng}
          position={infoWindow.position}
          onCloseClick={() => setInfoWindow(null)}
        >
          {infoWindow.content}
        </InfoWindow>
      )}
    </Gmap>
  );
};

export default React.memo(Map);
