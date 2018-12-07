import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './PatientMenu.css';

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  residents: {
    id: 'patientmenu.residents',
    defaultMessage: 'In Zwischenablage kopiert'
  },
});


class PatientMenu extends Component {
  render() {
    const { patients, intl:{formatMessage} } = this.props;

    return (
      <div className="PatientMenu">
        <div className="PatientMenu__headline">
          <FaHome />
          <span style={{ marginLeft: '20px' }}>
            {formatMessage(messages.residents)}
          </span>
        </div>
        {patients.map(patient => (
          <NavLink
            key={patient._id}
            to={`/patients/${patient._id}`}
            className="PatientMenu__item"
            activeClassName="PatientMenu__item--active"
          >
            {patient.name}
          </NavLink>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients,
});

export default connect(mapStateToProps)(injectIntl(withRouter(PatientMenu)));

