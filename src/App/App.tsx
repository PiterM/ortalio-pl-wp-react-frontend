import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { Provider } from 'react-redux';
import HomePage from '../Pages/HomePage/HomePage.container';
import './App.css';
import store from './App.store';
import appResolvers from './App.resolvers';

const client = new ApolloClient({
  uri: "http://ortl.net.pl/graphql",  // ortl.local for local
  resolvers: appResolvers
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
