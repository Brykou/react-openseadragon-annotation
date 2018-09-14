import React, {Component} from 'react';
import OpenSeadragon from './react-openseadragon';

class App extends Component {
  render() {
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <OpenSeadragon
          tileSources="https://image-server.images.test.medmain.com/iiif/2/pidport%2Fimages%2Fpyramidal%2Fcjlvtt4ph000201qllnygn141.tiff"
          showNavigationControl={false}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    );
  }
}

export default App;
