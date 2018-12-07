import React, { Component } from 'react';
import { FaTint } from 'react-icons/fa';
import Entry from './Entry';

class WaterEntry extends Component {
  render() {
    return (
      <Entry
        color="rgb(0, 166, 255)"
        title="Wasserzunahme"
        Icon={FaTint}
        content="200 Milliliter"
      />
    );
  }
}

export default WaterEntry;
