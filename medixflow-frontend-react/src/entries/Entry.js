import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Moment from 'react-moment';
import { FaCopy } from 'react-icons/fa';
import './Entry.css';

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  copyConfirmation: {
    id: 'entry.copyConfirmation',
    defaultMessage: 'In Zwischenablage kopiert'
  },
});

class Entry extends Component {
  state = {
    copied: false,
  };

  handleCopy = () => {
    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };

  render() {
    const {
      Icon,
      title,
      createdAt,
      color,
      content,
      intl:{formatMessage}
    } = this.props;

    return (
      <div className="Entry">
        <div className="Entry__copy">
          {this.state.copied && (
            <span className="Entry__copy__confirmation">
              {formatMessage(messages.copyConfirmation)}
            </span>
          )}
          <CopyToClipboard text={content} onCopy={this.handleCopy}>
            <button className="Entry__copy__button">
              <FaCopy />
            </button>
          </CopyToClipboard>
        </div>
        <div className="Entry__headline">
          <div
            className="Entry__icon"
            style={{ backgroundColor: color }}
          >
            <Icon />
          </div>
          <div className="Entry__title">
            {title}
          </div>
        </div>
        <div className="Entry__content">
          {content}
        </div>
        <div className="Entry__createdAt">
            <Moment format="DD.MM.YYYY HH:mm">
                {createdAt}
            </Moment>
        </div>
      </div>
    );
  }
}

export default injectIntl(Entry);
