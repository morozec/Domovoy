import React from 'react';
import { Layout } from './components/Layout';
import './components/Main.css';

import { useAuth0 } from "./react-auth0-wrapper";
import Loading from "./components/Loading";

const App = () => {
  const { loading } = useAuth0();
  return loading ? <Loading /> : <Layout />
}

export default App
