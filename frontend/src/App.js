import logo from './logo.svg';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Route, NavLink } from 'react-router-dom';
import Navbar from './components/shared/nav/Navbar';


//Pages Imports
import HomePage from './pages/HomePage';

function App() {
  return (
    <main className="App">
      <Navbar/>
      <Route path="/" component={ HomePage }/>

    </main>
  );
}

export default App;
