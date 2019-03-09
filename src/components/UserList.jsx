import React from 'react';
import './UserList.css'

const UserList = ({ users, fetchPhotos, username }) => {
    
    const usersList = users.map(user => {
        const className = user.username === username ? "userlist__active" : "userlist"
        return (
            <div className={className} key={user.id} onClick={() => fetchPhotos(1, user.links.photos, user.username)}>
                <p>{user.name}</p>
            </div>
        )
    })
    return (
        <div>
            {users.length ? usersList : <div className="app__text"> No users found </div>}
        </div>
    )
}
export default UserList;