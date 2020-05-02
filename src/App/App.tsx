import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage.container';
import './App.css';
import store from './App.store';
import appResolvers from './App.resolvers';
import Page404 from '../Pages/ErrorPage/Page404';

const client = new ApolloClient({
  link: createHttpLink({ 
    uri: 'https://ortalio.website/graphql',
  }),
  cache: new InMemoryCache(),
  resolvers: appResolvers,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
