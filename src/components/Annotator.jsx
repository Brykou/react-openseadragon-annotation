import React from 'react';
import { debounce, get } from 'lodash';
import classNames from 'classnames';
import Overlay from './Overlay';
import './Annotator.css';

export default class Annotator extends React.Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      currentShape: [],
      shapeList: [],
      openSeadragon: null,
      isDrawingMode: true
    };
  }

  componentDidMount() {
    if (get(window, 'openSeadragon.instance', null) === null) {
      const intervalId = setInterval(() => {
        if (get(window, 'openSeadragon.instance', null) !== null) {
          this.setState({ openSeadragon: window.openSeadragon.instance });

          document.addEventListener('keydown', this.onKeyDown);
          this.container = document.getElementById('annotator');
          this.container.addEventListener('mousedown', this.onMouseDown);

          clearInterval(intervalId);
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.setState(prevState => ({
        isDrawingMode: !prevState.isDrawingMode
      }));
    }
  };

  onMouseDown = event => {
    this.container.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('mousemove', this.onMouseMove);
  };

  onMouseUp = event => {
    this.onMouseMove.cancel();
    this.setState(prevState => ({
      currentShape: [],
      shapeList: prevState.currentShape.length
        ? [...prevState.shapeList, prevState.currentShape]
        : prevState.shapeList
    }));

    this.container.removeEventListener('mouseup', this.onMouseMove);
    this.container.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = debounce(
    event => {
      const viewport = this.getImageViewport();

      // Normalize coordinates
      const x = ((event.clientX - viewport.originX) / viewport.width) * 100;
      const y = ((event.clientY - viewport.originY) / viewport.height) * 100;
      this.setState(prevState => ({
        currentShape: [...prevState.currentShape, { x, y }]
      }));
    },
    10,
    { maxWait: 50 }
  );

  /**
   * Compute image viewport in browser coordiniates
   * @returns Object originX and originY are the top left point of the image
   */
  getImageViewport = function() {
    const tile = window.openSeadragon.instance.world.getItemAt(0);
    const imageOrigin = tile.imageToViewerElementCoordinates(new window.OpenSeadragon.Point(0, 0));
    const imageSize = tile.imageToViewerElementCoordinates(tile.getContentSize());
    return {
      originX: imageOrigin.x,
      originY: imageOrigin.y,
      width: imageSize.x - imageOrigin.x,
      height: imageSize.y - imageOrigin.y
    };
  };

  render() {
    const { shapeList, currentShape, isDrawingMode, openSeadragon } = this.state;

    // Waiting for image to be loaded before rendering Overlay
    if (get(openSeadragon, 'world', null) === null) {
      return null;
    }

    return (
      <div id="annotator" className={classNames('annotator', { broadCastEvents: !isDrawingMode })}>
        <Overlay
          shapeList={shapeList}
          currentShape={currentShape}
          getImageViewport={this.getImageViewport}
        />
      </div>
    );
  }
}
