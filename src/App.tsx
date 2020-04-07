import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import HomePage from './Pages/HomePage/HomePage.container';
import { getAllOrtalioMediaDataResolver } from './Pages/HomePage/HomePage.resolvers';
import './App.css';

const client = new ApolloClient({
  uri: "http://ortl.local/graphql",
  resolvers: {
    Query: {
      data: getAllOrtalioMediaDataResolver
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}

export default App;
