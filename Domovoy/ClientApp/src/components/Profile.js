import React from 'react'
import { useAuth0 } from '../react-auth0-wrapper'
import Loading from './Loading'

const Profile = () => {
    const { user, loading } = useAuth0();

    if (loading || !user) {
        return <Loading />        
    }

    return (
        <div>
            <img src={user.picture} alt="Profile" />

            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </div>
    )
}

export default Profile