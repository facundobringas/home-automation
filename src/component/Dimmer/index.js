import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Txt, Heading } from 'rendition';

const Brightness = styled.div`
  color: white;
  text-align: center;
  margin-top: -160px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${space};
`;

const Center = styled.div`
  color: white;
  text-align: center;
`;

const Canvas = styled.canvas`
  ${space};
  @media (max-width: 52em) {
    margin-left: 5em;
  }
  @media (max-width: 30em) {
    margin-left: 1em;
  }
`;

const Figure = styled.figure`
  ${space};
  @media (max-width: 52em) {
    margin: 0px;
  }
`;

const Wrapper = styled.div`
  ${space};
`;

const map = (value, low1, high1, low2, high2) =>
  low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);

const getElement = className => window.document.querySelector(className);

class Dimmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mDown: false,
      target: 0,
    };
    this.raf = null;
    this.mPos = {
      x: 0,
      y: 0,
    };
    this.elementPosition = {
      x: 0,
      y: 0,
    };
    this.steps = 50;
    this.radius = 110;
    this.maxDiff = 150;
    this.constraint = 360;
    this.maxAngle = 250;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    this.initVariables();
    this.addEventListeners();
    this.draw(true);
  }

  componentWillReceiveProps(nextProps) {
    const { device } = this.props;
    if (nextProps.device.id !== device.id) {
      this.setState({ target: nextProps.device.brightness * 2.5 });
    }
  }

  componentDidUpdate() {
    this.initVariables();
    this.draw();
  }

  onMouseDown() {
    this.setState({ mDown: true });
  }

  onMouseUp() {
    this.setState({ mDown: false });
    const { updateDevice, device } = this.props;
    const { target } = this.state;
    if (this.hasDevice()) {
      updateDevice({ ...device, brightness: Math.ceil(target / 2.5) });
    }
  }

  onMouseMove(event) {
    const { mDown } = this.state;
    if (mDown && this.hasDevice()) {
      this.setMousePosition(event);
    }
  }

  setMousePosition(event) {
    let { target } = this.state;
    this.mPos = {
      x:
        (event.type === 'touchmove' ? event.touches[0].clientX : event.pageX)
        - (this.elementPosition.x + this.centerX),
      y:
        (event.type === 'touchmove' ? event.touches[0].clientY : event.pageY)
        - (this.elementPosition.y + this.centerY),
    };

    let ang = Math.atan2(this.mPos.x, this.mPos.y);
    if (ang < 0) {
      ang += 2 * Math.PI;
    }
    const deg = 360 - ang * (180 / Math.PI);
    const nextTarget = map(deg, 0, 360, -40, 270);
    const diff = Math.abs(nextTarget - target);
    if (diff < this.maxDiff && nextTarget < this.constraint) {
      target = nextTarget;
      if (target > this.maxAngle) {
        target = this.maxAngle;
      }
      if (target < 0) {
        target = 0;
      }
      this.setState({ target });
    }
  }

  initVariables() {
    this.$context = getElement('.dimmer');
    this.$body = getElement('body');
    this.$center = this.$context.querySelector('.center');
    this.$handle = this.$context.querySelector('.handle');
    this.$progress = this.$context.querySelector('.progress');
    this.ctx = this.$progress.getContext('2d');
    const centerOffset = this.$context.getBoundingClientRect();
    this.elementPosition = {
      x: centerOffset.left,
      y: centerOffset.top,
    };
    this.centerX = this.$progress.clientWidth / 2;
    this.centerY = this.$progress.clientHeight / 2;
    this.canvasSize = this.$progress.clientWidth;
  }

  updateBackground() {
    const { target } = this.state;
    const normalizedTarget = map(target, 0, this.maxAngle, 0, 1);
    const gray = parseInt(normalizedTarget * 255, 10);
    getElement('.dimmerBox').style.background = `#000 radial-gradient(ellipse at center, #8c8f95 0%, rgb(${gray},${gray},${gray}) 100%) center center no-repeat`;
  }

  drawLine(endAngle) {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(145 * (Math.PI / 180));
    const { radius } = this;
    const x = 0;
    const y = 0;
    const gradient = this.ctx.createLinearGradient(0, 0, 100, 0);
    gradient.addColorStop('0', '#fec400');
    gradient.addColorStop('1.0', '#876700');

    this.ctx.beginPath();
    this.ctx.shadowBlur = 10;
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = gradient;
    this.ctx.arc(x, y, radius, 0, (endAngle * Math.PI), false);
    this.ctx.stroke();
    return this.ctx.restore();
  }

  drawShadow() {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(145 * (Math.PI / 180));
    const { radius } = this;
    const x = 0;
    const y = 0;
    const gradient = this.ctx.createLinearGradient(0, 0, 100, 0);
    gradient.addColorStop('0', '#ffc400');
    gradient.addColorStop('1.0', '#876700');

    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = '#727375';
    this.ctx.arc(x, y, radius, 0, (this.maxAngle * Math.PI) / 180, false);
    this.ctx.stroke();
    return this.ctx.restore();
  }

  draw(first) {
    const { device } = this.props;
    const { target } = this.state;
    this.$progress.style.height = this.canvasSize;
    this.$progress.style.width = this.canvasSize;
    const endAngle = target / 180;
    this.drawShadow(endAngle, first);
    this.drawLine(first ? device.brightness * 2.5 / 180 : endAngle);
  }

  addEventListeners() {
    this.$context.addEventListener('mousedown', this.onMouseDown);
    this.$context.addEventListener('mousemove', this.onMouseMove);
    getElement('body').addEventListener('mouseup', this.onMouseUp);

    this.$context.addEventListener('touchstart', this.onMouseDown);
    this.$context.addEventListener('touchend', this.onMouseUp);
    getElement('body').addEventListener('touchmove', this.onMouseMove);
  }

  hasDevice() {
    const { device } = this.props ? this.props : {};
    return device && device.id;
  }

  render() {
    const { device } = this.props;
    const { target } = this.state;
    return (
      <Figure className="dimmer">
        <Wrapper className="wrapper" mt={3}>
          <Center className="center">
            <Txt>{ this.hasDevice() ? device.name : 'Select a device'}</Txt>
          </Center>
        </Wrapper>
        <div className="circle">
          <div className="knob" unselectable="on" />
        </div>
        <Canvas className="progress" width="300" height="300" />
        <Brightness width={[1]}>
          <Heading>{ target ? `${Math.ceil(target / 2.5)}%` : ''}</Heading>
          <Txt>{ this.hasDevice() ? 'Brightness' : ''}</Txt>
        </Brightness>
      </Figure>
    );
  }
}

Dimmer.propTypes = {
  device: PropTypes.object.isRequired,
  updateDevice: PropTypes.func.isRequired,
};

export default Dimmer;
