import React from 'react';
import './ListItem.css'
const ListItem = ({ photo }) => {
    return (
        <div key={photo.id} className="grid__item card">
            <div className="card__body">
                <img src={photo.urls.small} alt="" />
            </div>
        </div>
    )
}
export default ListItem;