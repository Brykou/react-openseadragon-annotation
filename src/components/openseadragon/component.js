import React from 'react';
import PropTypes from 'prop-types';

import { loadOpenSeadragon } from './loader';

export class OpenSeadragon extends React.Component {
  static propTypes = {
    tileSources: PropTypes.string.isRequired,
    showNavigationControl: PropTypes.bool,
    showNavigator: PropTypes.bool,
    navigatorPosition: PropTypes.string,
    style: PropTypes.object,
    onOpen: PropTypes.func.isRequired
  };

  id = String(Math.round(Math.random() * 1000000000));

  async componentDidMount() {
    const {
      tileSources,
      showNavigationControl,
      showNavigator,
      navigatorPosition,
      onOpen
    } = this.props;

    const OpenSeadragon = await loadOpenSeadragon();

    this.instance = OpenSeadragon({
      id: this.id,
      tileSources,
      showNavigationControl,
      showNavigator,
      navigatorPosition
    });

    if (onOpen) {
      this.instance.addHandler('open', () =>
        onOpen({ namespace: OpenSeadragon, instance: this.instance })
      );
    }
  }

  render() {
    const { style } = this.props;
    return <div id={this.id} style={style} />;
  }
}
