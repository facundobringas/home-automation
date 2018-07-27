import React from 'react';
import {
  Box, Table, Flex, Alert, Button, Heading, Container,
} from 'rendition';
import styled from 'styled-components';
import Dimmer from '../Dimmer';
import lightAPI from '../../service/lightAPI';
import lamp from '../../assets/lamp.png';
import arrow from '../../assets/baseline-arrow_back-24px.svg';

const columns = [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    label: 'Status',
    field: 'active',
    render: active => (active ? 'ON' : 'OFF'),
  },
  {
    label: 'Brightness',
    field: 'brightness',
    render: value => `${value}%`,
  },
];

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

class Lighting extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], selected: {} };
  }

  componentDidMount() {
    this.fetchDevices();
  }

  onRowClick = (device) => {
    this.setState({ selected: device, dimming: true });
  };

  backPressed = () => {
    this.setState({ dimming: false });
  };

  updateDevice = (device) => {
    lightAPI
      .updateDevice(device)
      .then(() => {
        this.fetchDevices();
      })
      .catch(error =>
        this.setState({ error: `Error while trying to update device: ${error.message}` }));
  };

  fetchDevices() {
    lightAPI
      .getDevices()
      .then((json) => {
        const { data } = json;
        this.setState({ data });
      })
      .catch(error =>
        this.setState({ error: `Error while trying to get devices: ${error.message}` }));
  }

  render() {
    const {
      data, selected, dimming, error,
    } = this.state;
    return (
      <Container p={0}>
        <Flex>
          {dimming ? (
            <DinamicButton m={2} emphasized square onClick={this.backPressed} />
          ) : (
            <StaticButton m={2} emphasized square onClick={this.backPressed} />
          )}
          <Heading.h3 my={3}>Lighting</Heading.h3>
        </Flex>
        <FlexWrap>
          <Box width={[dimming ? 0 : 1, dimming ? 0 : 1, 5 / 8]}>
            {error ? (
              <Alert danger>{error}</Alert>
            ) : (
              <Table columns={columns} data={data} rowKey="id" onRowClick={this.onRowClick} />
            )}
          </Box>
          <Box className="dimmerBox" bg="#3b3c41" width={[dimming ? 1 : 0, dimming ? 1 : 0, 3 / 8]}>
            <Dimmer device={selected} updateDevice={this.updateDevice} />
          </Box>
        </FlexWrap>
      </Container>
    );
  }
}

export default Lighting;
