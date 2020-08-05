import React from 'react';
import axios from 'axios'

const UsersCard = (props) => {

    return(
        <div>
            <h2>{props.user.name}</h2>
            <div>{props.user.bio}</div>
            <button onClick={() => props.deleteUser(props.user.id)}>Delete</button>
        </div>
    )
}

export default UsersCard;