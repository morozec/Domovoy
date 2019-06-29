import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { MapComponent } from './components/MapComponent';
import { HouseComponent } from './components/House/HouseComponent';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={MapComponent} />
            <Route exact path='/House' component={HouseComponent} />  
      </Layout>
    );
  }
}
