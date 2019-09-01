import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { MapComponent } from './components/MapComponent';
import { HouseComponent } from './components/House/HouseComponent';
import './components/Main.css';

import { useAuth0 } from "./react-auth0-wrapper";

const App = () => {
  const { loading, user } = useAuth0();
  if (loading){
    return <div>Loading...</div>
  }
  console.log(user)
  return <Layout></Layout>
}

export default App
