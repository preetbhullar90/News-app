import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <div className='header-container'>
      <div className='logo'>
        <h1>LoGO</h1>
      </div>
      <div className='search'>
        <input type="text" placeholder="Search" />
      </div>
      <div className='login-button'>
        <button>Login</button>
      </div>
    </div>
  );
}
