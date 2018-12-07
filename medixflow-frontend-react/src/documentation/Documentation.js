import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Documentation.css';
import PainEntry from '../entries/PainEntry';
import { receiveEntries } from '../state/entriesState';
import PainChart from '../chart/PainChart';

class Documentation extends Component {
  getPatientId() {
    return this.props.match.params.id;
  }

  fetchPainEntries(patientId) {
    axios.get(
      'https://medixflow.de/api/v1/pain',
      { params: {
        query: `{"patient": "${patientId}"}`
      } },
    )
      .then(response => this.props.dispatch(receiveEntries(response.data)))
      .catch(error => console.log(error));
  }

  componentWillReceiveProps(nextProps) {
    if(this.getPatientId() !== nextProps.match.params.id) {
      this.fetchPainEntries(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    this.fetchPainEntries(this.getPatientId());

    setInterval(() => {
      this.fetchPainEntries(this.getPatientId());
    }, 1000);
  }

  sortedEntries() {
    const { entries } = this.props;
    return entries.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);

      if (aDate < bDate) return 1;
      else if (aDate > bDate) return -1;

      return 0;
    });
  }

  render() {
    const { patients, entries } = this.props;
    const activePatient = patients.find(patient => patient._id === this.getPatientId());

    if (!activePatient) return null;

    return (
      <div className="Documentation">
        <h1>{activePatient.name}</h1>
        <div className="Documentation__content">
          <div className="Documentation__entries">
            {entries.length === 0 && (
              <div className="Documentation__entries__empty">
                Hier sind noch keine Einträge vorhanden.
              </div>
            )}
            {this.sortedEntries().map(entry => (
              <PainEntry
                key={entry._id}
                strength={entry.strength}
                createdAt={entry.createdAt}
              />
            ))}
          </div>
          <PainChart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entries,
  patients: state.patients,
});

export default connect(mapStateToProps)(Documentation);
