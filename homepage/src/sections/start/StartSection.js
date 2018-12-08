import React from 'react';
import bem from 'b_';
import logo from '../../images/logo.png';
import LearnMore from './LearnMore';
import './StartSection.scss';

const b = bem.with('StartSection');

function StartSection() {
  return (
    <div className={b()}>
      <img
        src={logo}
        alt="Medixflow Logo"
        className={b('logo')}
      />
      <h1 className={b('title')}>
        Medixflow
      </h1>
      <h2 className={b('subtitle')}>
        The digital voice assistant for senior care
      </h2>
      <h2 className={b('email')}>
        info@medixflow.com
      </h2>
      <a href="https://demo.medixflow.com" className={b('email')}>DEMO</a>
      <LearnMore />
    </div>
  );
}

export default StartSection;
