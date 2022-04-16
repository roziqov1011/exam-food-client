import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://exam-foods.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>

    <ApolloProvider client={client}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);