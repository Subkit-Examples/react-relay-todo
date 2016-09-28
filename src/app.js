import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import {
  Router,
  IndexRoute,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router'
import useRelay from 'react-router-relay'
import TodoApp from './components/TodoApp'
import TodoList from './components/TodoList'
import ViewerQueries from './queries/ViewerQueries'
import config from '../package.json'
import './style.css'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.graphql.endpoint.url, {
    fetchTimeout: 30000,
    headers: {
      'user-agent': config.graphql.endpoint.headers['user-agent'],
      'Authorization': config.graphql.endpoint.headers.Authorization,
    },
  }))

ReactDOM.render(
  <Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
  >
    <Route
      path='/' component={TodoApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={TodoList}
        queries={ViewerQueries}
        prepareParams={() => ({status: 'any'})}
      />
      <Route
        path=':status' component={TodoList}
        queries={ViewerQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
)
