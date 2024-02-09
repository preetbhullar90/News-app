import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../Utils/api';
import { UserCard } from './UserCard';

export const Users = () => {

    const [users, setUsers] = useState([]);



    useEffect(() => {
        fetchUsers().then((data) => {
           
            setUsers(data)
        })
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
