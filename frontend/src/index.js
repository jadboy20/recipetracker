import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App'
import MainPage from './components/MainPage'
import Recipe from './components/Recipe'
import RecipeForm from './components/RecipeForm'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route path="/main" component={ MainPage }/>
          <Route path="/recipe" component={ Recipe }/>
          <Route path="/recipeform" component={ RecipeForm } />
          <Route path="/" component={ App }/>
        </Switch>

    </BrowserRouter>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
