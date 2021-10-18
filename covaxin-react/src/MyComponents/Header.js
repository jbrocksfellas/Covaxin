import { buildQueries } from '@testing-library/react';
import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const activeStyle = {
    color: 'white',
    backgroundColor: '#0d6efd',
    padding: '8px 10px',
    borderRadius: '20px'
    // border: '2px solid red'
  };
  const activeStyle2 = {
    color: 'white',
    backgroundColor: '#198754',
    padding: '8px 10px',
    borderRadius: '20px'
    // border: '2px solid red'
  };
  const style = {
    textDecoration: 'none',
    color: "white",
    padding: '8px 10px',
  }
    return (
        <div className="container my-4 bg-dark py-3 rounded-pill">
     <NavLink exact to="/" activeStyle={activeStyle} style={style}>Alerts</NavLink>
     {/* {' | '} */}
     <NavLink to="/details" activeStyle={activeStyle2} style={style}>Details</NavLink>
     {/* {' | '} */}
     {/* <NavLink to="/about" activeStyle={activeStyle} style={style}>About</NavLink> */}
        </div>
    )
}
