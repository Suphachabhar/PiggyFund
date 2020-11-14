import React from 'react';
import { Navbar } from '../../common' ;

import './Header.css';

import logo from '../../../picture/logo.jpg';

function Header () {
  // Header Page with Logo and Nav Bar
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <img src={logo} alt="logo" />
        </section>
        
        <section className="header-top__navbar">
        <section className="header-top__navbar-row">
          <section className="header-top__navigation-left">
            <a href="/tracker" className="navbar-item">Tracker</a>
            <a href="/budget" className="navbar-item">Budget</a>
          </section>
          <section className="header-top__navigation">
            <Navbar />
          </section>
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
    </section>
  )
}

export default Header;