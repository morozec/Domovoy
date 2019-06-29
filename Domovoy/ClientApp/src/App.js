import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { MapComponent } from './components/MapComponent';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={MapComponent} />       
      </Layout>
    );
  }
}
