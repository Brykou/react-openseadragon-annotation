import React, { Component } from 'react';
import OpenSeadragon from './components/openseadragon';
import Annotator from './components/Annotator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSeadragon: null
    };
  }

  onOpen = openSeadragon => {
    this.setState({ openSeadragon: openSeadragon });
  };

  render() {
    const { openSeadragon } = this.state;
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          transform: 'translate3d(0)'
        }}
      >
        <OpenSeadragon
          tileSources="https://image-server.images.test.medmain.com/iiif/2/pidport%2Fimages%2Fpyramidal%2Fcjlvtt4ph000201qllnygn141.tiff"
          showNavigationControl={false}
          style={{ width: '100%', height: '100%' }}
          onOpen={this.onOpen}
        />
        {openSeadragon === null ? null : <Annotator openSeadragon={openSeadragon} />}
      </div>
    );
  }
}

export default App;
