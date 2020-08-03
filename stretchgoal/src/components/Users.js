import React, { useState, useEffect } from 'react';
import axios from 'axios'
import UserCard from './UserCard'

const initialValues = [{
    id: "",
    name: "",
    bio:""
}]

const Users = () => {
    const [users, setUsers] = useState(initialValues)
    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
        .then(res => {
            console.log(res)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const deleteUser = id => {
        axios.delete(`http://localhost:8000/api/users/${id}`)
        .then (res => {
            console.log("deleted", res)
            
            axios.get("http://localhost:8000/api/users")
            .then(res => {
            console.log(res)
            setUsers(res.data)
            })
            .catch(err => {
            console.log(err)
            })
        })
    }

    return(
        <div>
            <h1>List of Users</h1>
            {
                users.map((user) => {
                    return <UserCard key={user.id} user={user} deleteUser={deleteUser}/>
                })
            }
        </div>
    )
}

export default Users;