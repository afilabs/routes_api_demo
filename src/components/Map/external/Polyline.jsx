import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

function usePolyline(props) {
  const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, encodedPath, ...polylineOptions } = props;

  // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
  const callbacks = useRef({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const geometryLibrary = useMapsLibrary('geometry');

  const polyline = useRef(new google.maps.Polyline()).current;

  // Update PolylineOptions
  useMemo(() => {
    polyline.setOptions(polylineOptions);
  }, [polyline, polylineOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // Update the path with the encodedPath
  useMemo(() => {
    if (!encodedPath || !geometryLibrary) return;
    const path = geometryLibrary.encoding.decodePath(encodedPath);
    polyline.setPath(path);
  }, [polyline, encodedPath, geometryLibrary]);

  // Create polyline instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined) console.error('<Polyline> has to be inside a Map component.');
      return;
    }

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map, polyline]);

  // Attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polyline) return;

    // Add event listeners
    const gme = google.maps.event;
    const eventHandlers = [
      ['click', 'onClick'],
      ['drag', 'onDrag'],
      ['dragstart', 'onDragStart'],
      ['dragend', 'onDragEnd'],
      ['mouseover', 'onMouseOver'],
      ['mouseout', 'onMouseOut'],
    ];

    eventHandlers.forEach(([eventName, eventCallback]) => {
      gme.addListener(polyline, eventName, (e) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polyline);
    };
  }, [polyline]);

  return polyline;
}

/**
 * Component to render a polyline on a map
 */
export const Polyline = forwardRef((props, ref) => {
  const polyline = usePolyline(props);

  useImperativeHandle(ref, () => polyline, [polyline]);

  return null;
});
