import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router'
import App from './components/App'
import Voting from './components/Voting'

const pair = ['Trainspotting', '28 Days Later']

const routes = <Route component

ReactDOM.render(
  <Voting pair={pair} winner="Trainspotting" />,
  document.getElementById('app')
)
