import React from 'react';
import { Txt } from 'rendition';
import moment from 'moment';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { now: moment() };
  }

  componentDidMount() {
    setInterval(() => this.setState({ now: moment() }), 10000);
  }

  render() {
    const { now } = this.state;
    return <Txt color="white">{now.format('hh:mm a')}</Txt>;
  }
}

export default Clock;
