import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { MapComponent } from './components/MapComponent';
import { HouseComponent } from './components/House/HouseComponent';
import './components/Main.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            
      </Layout>
    );
  }
}
