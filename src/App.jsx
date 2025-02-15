import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import MapContainer from './containers/MapContainer';
import SearchBoxContainer from './containers/SearchBoxContainer';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <div className="control-pannel">
          <SearchBoxContainer />
        </div>
        <MapContainer />
      </APIProvider>
    </div>
  );
};

export default App;
