import React from 'react';
import { debounce } from 'lodash';
import Overlay from './Overlay';
import './Annotator.css';

export default class Annotator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShape: [],
      shapeList: []
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = event => {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  };

  onMouseUp = event => {
    this.onMouseMove.cancel();
    this.setState((prevState) => ({
      currentShape: [],
      shapeList: prevState.currentShape.length ? [...prevState.shapeList, prevState.currentShape] : prevState.shapeList
    }));

    document.removeEventListener('mouseup', this.onMouseMove);
    document.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = debounce(event => {
    this.setState((prevState) => ({
      currentShape: [...prevState.currentShape, { x: event.clientX, y: event.clientY }]
    }))
  }, 10, { 'maxWait': 50 });

  render() {
    const { shapeList, currentShape } = this.state;
    return (
      <div className="annotator">
        <Overlay shapeList={shapeList} currentShape={currentShape} />
      </div>
    );
  }
}
