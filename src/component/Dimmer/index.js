import React from 'react';
import { Heading, Container, Txt } from 'rendition';
import PropTypes from 'prop-types';

class Dimmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    const { device } = this.props;
    const { isVisible } = this.state;
    return isVisible && device.name ? (
      <Container>
        <Heading>Dimmer</Heading>
        <Txt>Device: {device.name}</Txt>
        <Txt>Status: {device.active ? 'ON' : 'OFF'}</Txt>
        <Txt>Brightness: {device.brightness} %</Txt>
      </Container>
    ) : (
      <Container>
        <Heading.h4>Select a Device</Heading.h4>
      </Container>
    );
  }
}

Dimmer.propTypes = {
  device: PropTypes.object,
};

Dimmer.defaultProps = {
  device: {},
};

export default Dimmer;
