import React, { Component } from 'react';
import OpenSeadragon from './react-openseadragon';
import Annotator from './components/Annotator';

class App extends Component {
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <OpenSeadragon
          tileSources="https://image-server.images.test.medmain.com/iiif/2/pidport%2Fimages%2Fpyramidal%2Fcjlvtt4ph000201qllnygn141.tiff"
          showNavigationControl={false}
          style={{ width: '100%', height: '100%' }}
          ref={openSeadragon => {
            window.openSeadragon = openSeadragon;
          }}
        />
        <Annotator />
      </div>
    );
  }
}

export default App;
