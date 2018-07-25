import React from 'react';
import {
  Box, Table, Flex, Alert,
} from 'rendition';
import Dimmer from '../Dimmer';
import lightAPI from '../../service/lightAPI';

const columns = [
  {
    label: 'Name',
    field: 'name',
    sorteable: true,
  },
  {
    label: 'Status',
    field: 'active',
    render: active => (active ? 'ON' : 'OFF'),
  },
  {
    label: 'Brightness',
    field: 'brightness',
  },
];

class Lighting extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], selected: {} };
  }

  componentDidMount() {
    lightAPI
      .getDevices()
      .then((json) => {
        const { data } = json;
        this.setState({ data });
      })
      .catch(error => this.setState({ error }));
  }

  onRowClick = (device) => {
    this.setState({ selected: device });
  };

  render() {
    const { data, selected, error } = this.state;
    return (
      <Flex>
        {error ? (
          <Alert my={2} danger>
            This is an alert message
          </Alert>
        ) : (
          ''
        )}
        <Box flex="3">
          <Table columns={columns} data={data} rowKey="id" onRowClick={this.onRowClick} />
        </Box>
        <Box flex="1">
          <Dimmer device={selected} />
        </Box>
      </Flex>
    );
  }
}

export default Lighting;
