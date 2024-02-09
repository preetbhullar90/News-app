import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../Utils/api';
import { UserCard } from './UserCard';

export const Users = () => {

    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


    useEffect(() => {
        fetchUsers()
          .then((data) => {
            setUsers(data);
            setLoading(true);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
    },[])





    return (
      <div className='user-container'>
            
    <div className="wrapper">
      {users.map((user) => (
        <ul key={user.name}>
          <UserCard user={user} />
        </ul>
      ))}
    </div>
      </div>
  );
}
