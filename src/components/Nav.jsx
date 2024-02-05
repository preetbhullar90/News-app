import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-subcontainer">
        <Link to="/">Topics</Link>
        <Link to="/">Articles</Link>
        <Link to="/">Comments</Link>
      </div>
    </div>
  );
}
