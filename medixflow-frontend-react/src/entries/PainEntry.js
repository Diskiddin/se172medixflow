import React, { Component } from 'react';
import { FaFire } from 'react-icons/fa';
import Entry from './Entry';

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  title: {
    id: 'painentry.title',
    defaultMessage: 'Schmerz'
  },
  content: {
    id: 'painentry.content',
    defaultMessage: 'Schmerzstärke'
  },
});

class PainEntry extends Component {
  render() {
    const {intl:{formatMessage}} = this.props;

    return (
      <Entry
        color="red"
        title={formatMessage(messages.title)}
        createdAt={this.props.createdAt}
        Icon={FaFire}
        content={(
          <span>{formatMessage(messages.content)} {this.props.strength}</span>
        )}
      />
    );
  }
}

export default injectIntl(PainEntry);
