import React from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';

export default class Annotation extends React.PureComponent {
  static propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const { points } = this.props;

    // Transform an array of points into a string for polygon
    const polygonPoints = reduce(
      points,
      (sum, point) => {
        return sum + `${point.x},${point.y} `;
      },
      ''
    );

    return (
      <polygon
        fill="red"
        fillOpacity="0.3"
        stroke="red"
        strokeWidth="0.1px"
        points={polygonPoints}
      />
    );
  }
}
