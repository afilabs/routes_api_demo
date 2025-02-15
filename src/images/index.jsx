import React, { useMemo } from 'react';

import { ReactComponent as ThreeDot } from './three-dot.svg';
import { ReactComponent as DRIVE } from './drive.svg';
import { ReactComponent as TWO_WHEELER } from './two-wheeler.svg';
import { ReactComponent as OriginMarker } from './origin-marker.svg';
import { ReactComponent as DestinationMarker } from './destination-marker.svg';

const images = {
  ThreeDot,
  DRIVE,
  TWO_WHEELER,
  OriginMarker,
  DestinationMarker,
};

const Image = ({ type, color, strokeColor, text, onClick }) => {
  const SVG = useMemo(() => {
    const SVGComponent = images[type];
    return SVGComponent ? (
      <SVGComponent style={{ fill: color || undefined, stroke: strokeColor || undefined }} />
    ) : null;
  }, [type, color]);

  return (
    <div className={`img-${type}`} onClick={onClick}>
      {SVG}
      {text !== undefined && <span>{text}</span>}
    </div>
  );
};

export default React.memo(Image);
