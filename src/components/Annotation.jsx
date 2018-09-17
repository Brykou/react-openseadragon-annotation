import React from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';

export default class Annotation extends React.Component {
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
    const polygonPoints = reduce(
      points,
      (sum, point) => {
        return sum + `${point.x},${point.y} `;
      },
      ''
    );

    return (
      <polygon fill="red" fillOpacity="0.3" stroke="red" strokeWidth="2px" points={polygonPoints} />
    );
  }
}
