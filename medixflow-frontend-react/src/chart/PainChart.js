import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PainChart.css';
import { FaFire } from 'react-icons/fa';

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  title: {
    id: 'chart.title',
    defaultMessage: 'Schmerzen'
  }
});

class PainChart extends Component {
  render() {
    const { entries, intl:{formatMessage} } = this.props;
    const date = new Date("2018-10-29");

    return (
      <div className="PainChart">
        <h3>
          <FaFire style={{ marginRight: '10px' }} />
          {formatMessage(messages.title)}
        </h3>
        <div className="PainChart__table">
          <div className="PainChart__table__column">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(weekday => (
              <div key={weekday} className="PainChart__table__weekcell">
                {weekday}
              </div>
            ))}
          </div>
          {_.times(16).map(i => (
            <div key={i} className="PainChart__table__column">
              {_.times(7).map(j => {
                date.setDate(date.getDate() + 1);
                const painEntry = entries.find(entry => {
                  return date.toDateString() === new Date(entry.createdAt).toDateString();
                });

                return (
                  <div
                    key={j}
                    className="PainChart__table__cell"
                    style={{
                      backgroundColor: painEntry
                        ? `rgba(255, 0, 0, ${1 / 10 * painEntry.strength})`
                        : 'white'
                    }}
                  >
                    {painEntry && painEntry.strength}
                  </div>
                );
              })}
            </div>
          ))}
       </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(mapStateToProps)(injectIntl(PainChart));
