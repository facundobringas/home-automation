import React from "react";
import { Box, Table, Flex, Alert, Button, Heading, Container } from "rendition";
import styled from "styled-components";
import isEqual from "lodash.isequal";
import Dimmer from "../Dimmer";
//import lightAPI from "../../service/lightAPI";
import lamp from "../../assets/lamp.png";
import arrow from "../../assets/baseline-arrow_back-24px.svg";
import "./index.css";
import { connect } from 'react-redux';
import { updateDevice, selectDevice } from '../../store/action/deviceActionCreators';

const StaticButton = styled(Button)`
  background: url('${lamp}');
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
`;

const DinamicButton = styled(StaticButton)`
  @media (max-width: 52em) {
    background: url('${arrow}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 25px;
  }
`;

const FlexWrap = styled(Flex)`
  flex-wrap: wrap;
`;

const ScrollableBox = styled(Box)`
  @media (max-width: 48em) {
    overflow-x: hidden;
    height: 25em;
    overflow-y: scroll;
  }
`;

const DimmerBox = styled(Box)`
  background: #3b3c41;
  min-height: 400px;
  border-radius: 5px;
`;

class Lighting extends React.Component {
  columns = [
    {
      label: "Name",
      field: "name",
      render: name => <strong>{name}</strong>,
      sortable: true
    },
    {
      label: "Status",
      field: "active",
      render: (active, device) => (
        <div>
          <label className="switch" htmlFor={`check_${device.id}`}>
            <input
              id={`check_${device.id}`}
              type="checkbox"
              checked={device.active}
              onChange={this.handleCheck}
            />
            <span className="slider round" />
          </label>
          <span className="activeSpan">{active ? "On" : "Off"}</span>
        </div>
      ),
    },
    {
      label: "Brightness",
      field: "brightness",
      render: value => `${value}%`,
    },
  ];

  constructor(props) {
    super(props);

    this.state = { data: [], selected: {} };
  }

  onRowClick = (device) => {
    const { selectDevice } = this.props;
    selectDevice(device.id);
  };

  backPressed = () => {
    this.setState({ dimming: false });
  };

  updateDevice = (device) => {
    const { updateDevice } = this.props;
    if (this.shouldUpdateDevice(device)) {
        updateDevice(device);
    }
  };

  handleCheck = (evt) => {
    const { data, selected } = this.props;
    const selectedDevice = data.find(device=>device.id===selected);
    this.updateDevice({
      ...selectedDevice,
      active: evt.target.checked,
      brightness: evt.target.checked ? 100 : 0,
    });
    this.setState({ dimming: false });
  };

  shouldUpdateDevice(device) {
    const { selected } = this.props;
    return !isEqual(device, selected);
  }

  render() {
    const { dimming, error } = this.state;
    const { data, selected } = this.props;
    const selectedDevice = data.find(device=>device.id===selected);
    return (
      <Container p={0} style={{ overflow: "hidden" }}>
        <Flex>
          {dimming ? (
            <DinamicButton m={2} emphasized square onClick={this.backPressed} />
          ) : (
            <StaticButton m={2} emphasized square onClick={this.backPressed} />
          )}
          <Heading.h4 my={3}>Lighting</Heading.h4>
        </Flex>
        <FlexWrap style={{ overflow: "hidden" }}>
          <ScrollableBox width={[dimming ? 0 : 1, dimming ? 0 : 1, 5 / 8]}>
            {error ? (
              <Alert danger w={9 / 10}>
                {error}
              </Alert>
            ) : (
              <Table
                columns={this.columns}
                data={data}
                rowKey="id"
                onRowClick={this.onRowClick}
              />
            )}
          </ScrollableBox>
          <DimmerBox width={[dimming ? 1 : 0, dimming ? 1 : 0, 3 / 8]}>
            <Dimmer device={selectedDevice || {}} updateDevice={this.updateDevice} />
          </DimmerBox>
        </FlexWrap>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.devices,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDevice(device)),
  selectDevice: device => dispatch(selectDevice(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lighting);
