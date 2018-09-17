import React from 'react';
import PropTypes from 'prop-types';
import Annotation from './Annotation';

export default class Overlay extends React.Component {
  static propTypes = {
    shapeList: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    ).isRequired,
    currentShape: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const { shapeList, currentShape } = this.props;
    return (
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        wdth="100%"
        height="100%"
      >
        {shapeList.map((shape, index) => {
          return <Annotation key={index} points={shape} />;
        })}
        {currentShape.length > 0 ? <Annotation points={currentShape} /> : null}
      </svg>
    );
  }
}
