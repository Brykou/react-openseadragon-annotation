import React from 'react';
import { debounce } from 'lodash';
import Overlay from './Overlay';
import './Annotator.css';

export default class Annotator extends React.Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      currentShape: [],
      shapeList: []
    };
  }

  componentDidMount() {
    this.container = document.getElementById('annotator');
    this.container.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    this.container.removeEventListener('mousedown', this.onMouseDown);
  }

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
      this.setState(prevState => ({
        currentShape: [...prevState.currentShape, { x: event.clientX, y: event.clientY }]
      }));
    },
    10,
    { maxWait: 50 }
  );

  render() {
    const { shapeList, currentShape } = this.state;

    return (
      <div id="annotator" className="annotator">
        <Overlay shapeList={shapeList} currentShape={currentShape} />
      </div>
    );
  }
}
