import React, { useContext } from 'react';
import './UserCard.css';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export const UserCard = ({ user }) => {
    const { setCurrentUser } = useContext(UserContext)

     const login = () => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  return (
    <div className="user-card">
      <div>
        <div className="user-login-name">
          <Link to="/">
            <button onClick={login}>Login</button>
          </Link>

          <p>{user.username}</p>
        </div>
        <img src={user.avatar_url} alt="" />
      </div>
    </div>
  );
}
