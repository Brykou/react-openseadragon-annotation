import React, { Component } from 'react';
import { get } from 'lodash';
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
    if (get(window, 'openSeadragon.instance', null) === null) {
      const intervalId = setInterval(() => {
        if (get(window, 'openSeadragon.instance', null) !== null) {
          this.setState({ openSeadragon: window.openSeadragon.instance });
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }

  render() {
    const { openSeadragon } = this.state;
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
        {get(openSeadragon, 'world', null) === null ? null : (
          <Annotator openSeadragon={openSeadragon} />
        )}
      </div>
    );
  }
}

export default App;
