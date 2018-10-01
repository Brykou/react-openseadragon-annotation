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
    ).isRequired,
    openSeadragon: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { getImageViewport } = this.props;
    this.state = {
      viewportSize: getImageViewport()
    };
  }

  componentDidMount() {
    const { openSeadragon } = this.props;
    openSeadragon.instance.addHandler('animation', this.handleResize);
  }

  componentWillUnmount() {
    const { openSeadragon } = this.props;
    openSeadragon.instance.removeAllHandlers('animation');
  }

  handleResize = () => {
    const { getImageViewport } = this.props;
    this.setState({
      viewportSize: getImageViewport()
    });
  };

  render() {
    const { shapeList, currentShape } = this.props;
    const { viewportSize } = this.state;
    const svgStyle = {
      position: 'absolute',
      display: 'block',
      left: viewportSize.originX,
      top: viewportSize.originY,
      width: viewportSize.width,
      height: viewportSize.height
    };

    return (
      <svg
        id="annotation-overlay"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={svgStyle}
      >
        {shapeList.map((shape, index) => {
          return <Annotation key={index} points={shape} />;
        })}
        {currentShape.length > 0 ? <Annotation points={currentShape} /> : null}
      </svg>
    );
  }
}
