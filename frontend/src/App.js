import logo from './logo.svg';
import './App.css';
import { Header, Button } from 'semantic-ui-react'


function App() {
    fetch('http://192.168.0.83/backend/ingredients/all', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => console.log(response.text()));
  return (
    <div className="App">
        <div className='padding'></div>
        <Header as='h1'>Recipe Summary</Header>
        <logo></logo>

    </div>
  );
}

export default App;
