import React from 'react';
import bem from 'b_';
import logo from '../images/logo.png';
import './Header.scss';

const b = bem.with('Header');

function Header() {
  const g = 50;

  return (
    <div className={b()}>
      <img src={logo} className={b('logo')} alt="Logo" />
      <div className={b('title')}>
        Medixflow
      </div>
      <svg className={b('edge')} width={g} height={g}>
        <path className={b('path')} d={`M ${g} 0 Q 0 0 0 ${g} L 0 0 L ${g}`} />
      </svg>
    </div>
  );
}

export default Header;
