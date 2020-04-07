import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import HomePage from './Pages/HomePage/HomePage.container';
import './App.css';
import appResolvers from './App.resolvers';

const client = new ApolloClient({
  uri: "http://ortl.local/graphql",
  resolvers: appResolvers
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}

export default App;
