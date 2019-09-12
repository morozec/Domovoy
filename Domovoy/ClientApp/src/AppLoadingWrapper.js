import React from 'react'
import { useAuth0 } from './react-auth0-wrapper'

import App from './App'
import Loading from './components/Loading'

const AppLoadingWrapper = () => {
    const { loading } = useAuth0()

    return loading ? <Loading/> : <App/>
}

export default AppLoadingWrapper