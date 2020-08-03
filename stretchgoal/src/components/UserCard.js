import React from 'react';


const UsersCard = (props) => {


    return(
        <div>
            <h2>{props.user.name}</h2>
            <div>{props.user.bio}</div>
        </div>
    )
}

export default UsersCard;