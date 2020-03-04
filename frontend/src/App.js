import React from 'react';
import BinCollectPage from './page/bin_collect';


function App() {
  return (
    <React.Fragment>
      <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""/>
          
      <BinCollectPage/>
    </React.Fragment>
  );
}

export default App;
