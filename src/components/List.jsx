import React from 'react';
import ListItem from './ListItem'
const List = ({ data }) => {
    const items = data.map(photo => <ListItem key={photo.id} photo={photo} />);
    return (
        <div className="grid">
            {data.length ? items : <div className="app__text grid__text">No photos found for the selected user</div>}
        </div>
    )
}

export default List;