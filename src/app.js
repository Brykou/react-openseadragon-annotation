import React, { Component } from 'react';
import { get, isNil } from 'lodash';
import OpenSeadragon from './react-openseadragon';
import Annotator from './components/Annotator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSeadragon: null
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      // Wait for world and image to be loaded before loading annotator
      const OSDWorld = get(window, 'openSeadragon.instance.world', null);
      if (isNil(OSDWorld) === false && isNil(OSDWorld.getItemAt(0)) === false) {
        this.setState({ openSeadragon: window.openSeadragon.instance });
        clearInterval(intervalId);
      }
    }, 1000);
  }

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
          ref={openSeadragon => {
            window.openSeadragon = openSeadragon;
          }}
        />
        {openSeadragon === null ? null : <Annotator openSeadragon={openSeadragon} />}
      </div>
    );
  }
}

export default App;
